import { type DirectionsResponseData } from "@googlemaps/google-maps-services-js";

import { type IGoogleService } from "./google.interface";
import { type IDriverOption } from "../driver.interface";

interface IRideHistory extends IRideService.ILocationData {
  date: Date;
  origin: string;
  destination: string;
  driver: { id: number; name: string };
  value: number;
}

export namespace IRideService {
    export interface ILocationData {
      distance: number;
      duration: string;
    }

    export interface IGenerateDriverOptions extends IDriverOption {}

    export interface IEstimateRide extends IGoogleService.IRideData {
        routeResponse: DirectionsResponseData;
        options: IDriverOption[];
    }

    export interface IRidesHistory {
      customer_id: string;
      rides: IRideHistory[];
    }

    export interface IConfirmRide {
        success: boolean;
    }
}
