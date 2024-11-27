import type { IAddresses, IDriverOption, ILocationData } from '../ride.interface';
  
export namespace IRideResponse {
      interface IRideHistory extends ILocationData, IAddresses {
        id: number;
        date: string;
        driver: { id: number; name: string };
        value: number;
      }
      
      export interface IEstimateRide extends ILocationData {
        options: IDriverOption[];
        routeResponse: object;

      }
  
      export interface IRidesHistory {
        customer_id: string;
        rides: IRideHistory[];
      }
  
      export interface IConfirmRide {
          success: boolean;
      }
  }

export namespace IRideRequest {
    export interface IRideEstimateBody extends IAddresses {
        customer_id: string;
    }

    export interface IRideConfirmBody extends IRideEstimateBody, ILocationData {
        driver: {
            id: number,
            name: string,
        },
        value: number,
    }

    export interface IRidesHistoryParams {
        customerId: string;
    }

    export interface IRidesHistoryQuery {
        driverId?: number;
    }
}
