import { NextFunction, Request, Response } from 'express';

import RideService from '../services/ride.service';
import { type IRideController } from '../interfaces/controllers/ride.interface';

async function postEstimate(req: Request, res: Response, next: NextFunction) {
    const { origin, destination, customer_id } = req.body as IRideController.IRideEstimateBody;

    try {
        const estimatedRide = await RideService.estimateRide({ origin, destination });
        res.status(200).json(estimatedRide);
    } catch (error) {
        next(error);
    }
}

async function patchConfirm(req: Request, res: Response, next: NextFunction) {
    const {
        customer_id,
        origin,
        destination,
        distance,
        duration,
        driver,
        value,
    } = req.body as IRideController.IRideConfirmBody;

    try {
        const ride = {
            customer_id,
            origin,
            destination,
            distance,
            duration,
            driver,
            value,
        };
        const estimatedRide = await RideService.confirmRide(ride);
        res.status(200).json(estimatedRide);
    } catch (error) {
        next(error);
    }
}

async function getRidesHistory(req: Request, res: Response, next: NextFunction) {
    // const { customer_id } = req.params as IRideController.IRidesHistoryParams;
    // const { driver_id } = req.query as IRideController.IRidesHistoryQuery;

    const { customer_id } = req.params as any;
    const { driver_id } = req.query as any;

    try {
        const estimatedRide = await RideService.ridesHistory(customer_id, driver_id);
        res.status(200).json(estimatedRide);
    } catch (error) {
        next(error);
    }
}

const RideController = {
    postEstimate,
    patchConfirm,
    getRidesHistory,
};

export default RideController;
