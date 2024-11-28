import { getRideData } from "./google.service";
import DriverService from "./driver.service";
import RideModel from "../database/models/ride.model";
import database from "../database";
import RideCustomerDriverModel from "../database/models/ride_customer_driver.model";
import DriverModel from "../database/models/driver.model";
import CustomerService from "./customer.service";
import NoRidesFoundError from "@/middlewares/errorHandler/NoRidesFoundError";
import { ValidationError } from "yup";
import DriverNotFoundError from "@/middlewares/errorHandler/DriverNotFoundError";
import InvalidDistanceError from "@/middlewares/errorHandler/InvalidDistanceError";
import { convertMetersToKilometers } from "@/helpers/converters";
import InvalidDataError from "@/middlewares/errorHandler/InvalidDataError";
import { DriverDTO, DriverBaseDTO } from "@/types/dtos/driver.dto";
import { RideDTO } from "@/types/dtos/ride.dto";
import { IRideController } from "@/types/interfaces/controllers/ride.interface";
import { IAddresses } from "@/types/interfaces/ride.interface";
import { IRideService } from "@/types/interfaces/services/ride.interface";
import InvalidDriverError from "@/middlewares/errorHandler/InvalidDriverError";

const generateDriverOptions = (drivers: DriverDTO[], distance: number): IRideService.IGenerateDriverOptions[] => drivers.map(driver => {
    const estimateRideValue = (price: number): number => {
        return distance * price;
    };

    return {
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: driver.review,
        value: estimateRideValue(driver.pricePerKm),
    };
});

const isValidDistance = (distance: number) => {
    if (!distance || distance <= 0) {
        const validationError = new ValidationError("Distancia deve ser um valor válido");
        throw new InvalidDistanceError(validationError);
    }
}

const isValidAddresses = ({ origin, destination }: IAddresses) => {
    if (origin === destination) {
        const validationError = new ValidationError("Origem e destino devem ser valores diferentes.");
        throw new InvalidDataError(validationError);
    }
}

const isValidDriver = async (driverId?: number) => {
    if (!driverId) {
        const validationError = new ValidationError("Motoristas inválido para esta busca.");
        throw new InvalidDriverError(validationError);
    }

    const driver = await DriverService.getDriverByPk(driverId as number);
    if (!driver) {
        const validationError = new ValidationError("Não há motoristas para esta busca.");
        if (!driver) throw new DriverNotFoundError(validationError);
    }
    return driver;
}

const isValidDriverRide = (driverMinKm: number, distance: number) => {
    const distanceInKm = convertMetersToKilometers(distance);

    if (driverMinKm >= distanceInKm) {
        const validationError = new ValidationError("Distancia inválida para este motorista.");
        throw new InvalidDistanceError(validationError);
    }
}

const estimateRide = async ({ destination, origin }: IRideController.IRideEstimateBody): Promise<IRideService.IEstimateRide> => {
    try {
        isValidAddresses({ destination, origin });

        const rideData = await getRideData({ destination, origin });
        const distance = convertMetersToKilometers(rideData.distance);
        
        isValidDistance(distance);

        const avaiableDrivers = await DriverService.getAvaiableDriversWithReview(distance);
        const driverOptions = generateDriverOptions(avaiableDrivers, distance);

        return { ...rideData, options: driverOptions };
    } catch (error) {
        throw error;
    }
}

const confirmRide = async (ride: IRideController.IRideConfirmBody): Promise<IRideService.IConfirmRide> => {
    try {
        const { driver: { id: driverId }, customer_id, origin, destination, distance, duration, value } = ride;

        isValidDistance(distance);

        isValidAddresses({ destination, origin });

        const validDriver = await isValidDriver(driverId);

        isValidDriverRide(validDriver.minKm, distance);

        await database.transaction(async (transaction) => {
            const customerExists = await CustomerService.getCustomerByPk(customer_id);
            if (!customerExists) {
                await CustomerService.saveCustomer(customer_id);
            }                
                const confirmedRide = await RideModel.create(
                    {
                        origin,
                        destination,
                        distance,
                        duration,
                        value,
                    },
                    { transaction }
                );
                                
                await RideCustomerDriverModel.create(
                    {
                        rideId: confirmedRide.id,
                        driverId,
                        customerId: customer_id
                    },
                    { transaction }
                );
            });            
        return { success: true };
    } catch (error) {
        throw error;
    }
}

const ridesHistory = async ({ customer_id }: IRideController.IRidesHistoryParams, { driver_id }: IRideController.IRidesHistoryQuery): Promise<IRideService.IRidesHistory> => {
    if (driver_id != undefined) {
        await isValidDriver(driver_id);
    }

    const rides = await RideCustomerDriverModel.findAll({
        where: driver_id ? { customer_id, driver_id } : { customer_id },
        include: [
            { model: RideModel, attributes: ['id', 'origin', 'destination', 'distance', 'duration', 'value', 'date'], as: 'ride' },
            { model: DriverModel, attributes: ['id', 'name'], as: 'driver' },
        ],
        attributes: [],
        order: [
            [{ model: RideModel, as: 'ride' }, 'date', 'DESC'] 
        ],
    });

    if (!rides.length) {
        const validationError = new ValidationError("Não há corridas para esta busca.");
        throw new NoRidesFoundError(validationError);
    }

    const ridesDTO = rides.map(({ ride, driver }: any) => {
        const rideDTO = new RideDTO(ride);
        const driverDTO = new DriverBaseDTO(driver);

        return { ...rideDTO, driver: driverDTO };
    })

    return { customer_id, rides: ridesDTO };
};


const RideService = {
    estimateRide,
    confirmRide,
    ridesHistory
}

export default RideService;

