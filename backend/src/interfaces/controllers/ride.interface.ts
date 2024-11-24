import { type IAddresses } from "../ride.interface";

export namespace IRideController {
    export interface ILocationData {
      distance: number;
      duration: string;
    }

    export interface IRideEstimate extends IAddresses {
        customer_id: string;
    }

    export interface IRideConfirm extends IRideEstimate, ILocationData {
        driver: {
            id: number,
            name: string,
        },
        value: number,
    }
}
