import { ICustomer } from "../customer.interface";
import { ILocationData, type IAddresses } from "../ride.interface";

export namespace IRideController {
    export interface IRideEstimateBody extends IAddresses, ICustomer { };

    export interface IRideConfirmBody extends IAddresses, ILocationData, ICustomer {
        driver: { id: number; name: string },
        value: number,
    }

    export interface IRidesHistoryParams extends IRideEstimateBody, ILocationData, ICustomer { }

    export interface IRidesHistoryQuery extends IRideEstimateBody, ILocationData {
        driver_id?: number;
    }
}
