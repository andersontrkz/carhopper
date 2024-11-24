import { type IAddresses } from "../ride.interface";

export namespace IRideController {
    export interface ILocationData {
      distance: number;
      duration: string;
    }

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

    export interface IRidesHistoryParams extends IRideEstimateBody, ILocationData {
        customer_id: string;
    }

    export interface IRidesHistoryQuery extends IRideEstimateBody, ILocationData {
        driver_id?: number;
    }
}
