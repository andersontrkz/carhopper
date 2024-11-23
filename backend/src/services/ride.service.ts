import { IAddresses } from "../interfaces/ride.interface";
import { drivers as RDRIVERS } from "../data/driversData";
import { IDriver, IDriverOption } from "src/interfaces/driver.interface";
import RetrievingDataError from "../middlewares/errorHandler/RetrievingDataError";
import { IRideService } from "src/interfaces/services/ride.interface";
import { getRideData } from "./google.service";

const generateDriverOptions = (drivers: IDriver[], distance: number): IRideService.IGenerateDriverOptions[] => drivers.map(driver => {
    const estimateRideValue = (price: number): number => {
        return distance * price;
    };

    return {
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: driver.review,
        value: estimateRideValue(driver.pricePerKm)
    };
});

const estimateRide = async (addresses: IAddresses): Promise<IRideService.IEstimateRide> => {
    const filterAvaiableDrivers = (drivers: IDriver[], distance: number): IDriver[] => drivers.filter(({ minKm }) => minKm >= distance);
    const sortByValue = <T extends { value: number }[]>(items: T) => items.sort((a, b) => a.value - b.value);

    try {
        const rideData = await getRideData(addresses);
        const { distance } = rideData;

        const avaiableDrivers = filterAvaiableDrivers(RDRIVERS, distance);
        const driverOptions = generateDriverOptions(avaiableDrivers, distance);
    
        return {
            ...rideData,
            options: sortByValue(driverOptions),
        };
    } catch (error) {
        throw error;
    }
}

const RideService = {
    estimateRide,
}

export default RideService;

