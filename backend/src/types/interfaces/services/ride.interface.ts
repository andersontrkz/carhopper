import { type DirectionsResponseData } from "@googlemaps/google-maps-services-js";

import { type IGoogleService } from "./google.interface";
import { type IDriverOption } from "../driver.interface";
import { type ILocationData, type ICoordinates } from "../ride.interface";
import { type ICustomer } from "../customer.interface";

interface IRideHistory extends ICoordinates, ILocationData {
  date: Date;
  origin: string;
  destination: string;
  driver: { id: number; name: string };
  value: number;
}

export namespace IRideService {
    export interface IGenerateDriverOptions extends IDriverOption { }

    export interface IEstimateRide extends IGoogleService.IRideData {
        routeResponse: DirectionsResponseData;
        options: IDriverOption[];
    }

    export interface IRidesHistory extends ICustomer {
      rides: IRideHistory[];
    }

    export interface IConfirmRide {
        success: boolean;
    }
}
