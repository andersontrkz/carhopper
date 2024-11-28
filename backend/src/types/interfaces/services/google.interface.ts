import { DirectionsResponseData } from "@googlemaps/google-maps-services-js";

import { ILocationData, type ICoordinates } from "../ride.interface";

export namespace IGoogleService {
    export interface IDirectionsData extends ICoordinates, ILocationData { }

    export interface IRideData extends IDirectionsData, ICoordinates {
        routeResponse: DirectionsResponseData;
    }
}
