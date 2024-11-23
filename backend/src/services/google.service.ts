import { convertMetersToKilometers, convertSecondsToMinutes } from "../helpers/converters";
import { getCoordinates, getDirectionsData } from "../apis/google.api";
import { type IAddresses } from "../interfaces/ride.interface";
import { type DirectionsResponseData } from "@googlemaps/google-maps-services-js";
import RetrievingDataError from "../middlewares/errorHandler/RetrievingDataError";
import { type IGoogleService } from "src/interfaces/services/google.interface";

const getLocationsData = (directionsData: DirectionsResponseData): IGoogleService.ILocationData => {
    const [route] = directionsData.routes;
    const [step] = route.legs;

    const distance = convertMetersToKilometers(step.distance.value);
    const duration = convertSecondsToMinutes(step.duration.value);

    return { distance, duration: String(duration) };
};


const getRideData = async (addresses: IAddresses): Promise<IGoogleService.IRideData> => {
    try {
        const origin = await getCoordinates(addresses.origin);
        const destination = await getCoordinates(addresses.destination);
    
        const directionsData = await getDirectionsData(addresses);
        const { distance, duration } = getLocationsData(directionsData);
    
        return {
            origin,
            destination,
            distance,
            duration: duration,
            routeResponse: directionsData,
        };
    } catch (error: unknown) {
        throw new RetrievingDataError(error as Error);
    }
}

export {
    getRideData,
};
