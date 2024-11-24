import { IAddresses } from "../interfaces/ride.interface";
import { drivers as RDRIVERS } from "../data/driversData";
import { type IDriver } from "src/interfaces/driver.interface";
import { IRideService } from "src/interfaces/services/ride.interface";
import { getRideData } from "./google.service";
import { IRideController } from "src/interfaces/controllers/ride.interface";

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

const confirmRide = async (ride: IRideController.IRidesHistoryQuery): Promise<IRideService.IConfirmRide> => {
    const save = async (payload: any) => {
        console.log('payload', payload)
        return true;
    };

    try {
        await save(ride);
        
        return { success: true };
    } catch (error) {
        throw error;
    }
}

const ridesHistory = async (customer_id: string, driver_id: number): Promise<IRideService.IRidesHistory> => {
    const getRides = async () => {
        const filterAvaiableDrivers = (drivers: IDriver[], distance: number): IDriver[] => drivers.filter(({ minKm }) => minKm >= distance);
        const avaiableDrivers = filterAvaiableDrivers(RDRIVERS, 1);
        const driverOptions = generateDriverOptions(avaiableDrivers, 1);

        if (driver_id) {
            return {
                customer_id,
                rides: driverOptions.filter(({ id }) => id === Number(driver_id)).map(({ id, name, value }) => {
                    return {
                        origin: "R. Washington Luiz, 559 - Boqueirão, Guarapuava - PR, 85020-300, Brazil",
                        destination: "Av. Pref. Moacyr Júlio Silvestri, 944 - Centro, Guarapuava - PR, 85010-090, Brazil",
                        distance: 4.085,
                        duration: "9.15",
                        driver: { id, name },
                        value,
                        date: new Date()
                    }
                }),
            };
        }

        return {
            customer_id,
            rides: driverOptions.map(({ id, name, value }) => {
                return {
                    origin: "R. Washington Luiz, 559 - Boqueirão, Guarapuava - PR, 85020-300, Brazil",
                    destination: "Av. Pref. Moacyr Júlio Silvestri, 944 - Centro, Guarapuava - PR, 85010-090, Brazil",
                    distance: 4.085,
                    duration: "9.15",
                    driver: { id, name },
                    value,
                    date: new Date()
                }
            }),
        };
    };

    try {
        const rides = await getRides();
        
        return rides;
    } catch (error) {
        throw error;
    }
}

const RideService = {
    estimateRide,
    confirmRide,
    ridesHistory
}

export default RideService;

