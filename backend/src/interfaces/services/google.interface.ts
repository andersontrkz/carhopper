import { DirectionsResponseData } from "@googlemaps/google-maps-services-js";

import { type IRide } from "../ride.interface";

export namespace IGoogleService {
    export interface ILocationData {
      distance: number;
      duration: string;
    }

    export interface IRideData extends ILocationData, IRide {
        routeResponse: DirectionsResponseData;
    }
}
