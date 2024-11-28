import { getRouteData } from "@/apis/google.api";
import RetrievingDataError from "@/middlewares/errorHandler/RetrievingDataError";
import { IAddresses } from "@/types/interfaces/ride.interface";
import { IGoogleService } from "@/types/interfaces/services/google.interface";
import { type DirectionsResponseData } from "@googlemaps/google-maps-services-js";

const getDirectionsData = (directionsData: DirectionsResponseData): IGoogleService.IDirectionsData => {
    const [route] = directionsData?.routes;
    const [step] = route?.legs;

    const distance = step.distance.value;
    const duration = step.duration.text;

    const origin = { latitude: step.start_location.lat, longitude: step.start_location.lng };
    const destination = { latitude: step.end_location.lat, longitude: step.end_location.lng };    

    return { distance, duration: duration, origin, destination };
};


const getRideData = async (addresses: IAddresses): Promise<IGoogleService.IRideData> => {
    try {   
        const routeResponse = await getRouteData(addresses);
        const { distance, duration, origin, destination } = getDirectionsData(routeResponse);
    
        return {
            origin,
            destination,
            distance,
            duration,
            routeResponse,
        };
    } catch (error: unknown) {
        throw new RetrievingDataError(error as Error);
    }
}

export {
    getRideData,
};
