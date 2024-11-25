import { type IAddresses } from "../interfaces/ride.interface";
import { type IRideService } from "src/interfaces/services/ride.interface";
import { getRideData } from "./google.service";
import { type IRideController } from "src/interfaces/controllers/ride.interface";
import DriverService from "./driver.service";
import { DriverBaseDTO, DriverDTO } from "../dtos/driver.dto";
import RideModel from "../models/ride.model";
import sequelize from "../config/database";
import RideCustomerDriverModel from "../models/ride_customer_driver.model";
import { RideDTO } from "../dtos/ride.dto";
import DriverModel from "../models/driver.model";

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

const estimateRide = async (addresses: IAddresses): Promise<IRideService.IEstimateRide> => {
    const sortByValue = <T extends { value: number }[]>(items: T) => items.sort((a, b) => a.value - b.value);

    try {
        const rideData = await getRideData(addresses);
        const { distance } = rideData;

        const avaiableDrivers = await DriverService.getAvaiableDriversWithReview(distance);
        const driverOptions = generateDriverOptions(avaiableDrivers, distance);

        return { ...rideData, options: sortByValue(driverOptions) };
    } catch (error) {
        throw error;
    }
}

const confirmRide = async (ride: IRideController.IRideConfirmBody): Promise<IRideService.IConfirmRide> => {
    try {
        const { driver, customer_id, origin, destination, distance, duration, value } = ride;

        await sequelize.transaction(async (transaction) => {
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
                driverId: driver.id,
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

const ridesHistory = async (customer_id: string, driver_id: number): Promise<IRideService.IRidesHistory> => {
    const rides = await RideCustomerDriverModel.findAll({
        where: driver_id ? { customer_id, driver_id } : { customer_id },
        include: [
            { model: RideModel, attributes: ['id', 'origin', 'destination', 'distance', 'duration', 'value', 'date'], as: 'ride' },
            { model: DriverModel, attributes: ['id', 'name'], as: 'driver' },
        ],
        attributes: []
    });

    console.log('rideDTO', rides[0]);

    const ridesDTO = rides.map(({ ride, driver }) => {
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

