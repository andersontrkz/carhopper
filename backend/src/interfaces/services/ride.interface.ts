import { type DirectionsResponseData } from "@googlemaps/google-maps-services-js";

import { type IGoogleService } from "./google.interface";
import { type IDriverOption } from "../driver.interface";

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

  export interface IConfirmRide {
      success: boolean;
  }
}
