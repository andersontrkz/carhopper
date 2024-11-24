import { NextFunction, Request, Response } from 'express';

import RideService from '../services/ride.service';
import { type IRideController } from '../interfaces/controllers/ride.interface';

async function postEstimate(req: Request, res: Response, next: NextFunction) {
    const { origin, destination, customer_id } = req.body as IRideController.IRideEstimate;

    try {
        const estimatedRide = await RideService.estimateRide({ origin, destination });
        res.status(200).json(estimatedRide);
    } catch (error) {
        next(error);
    }
}

async function postConfirm(req: Request, res: Response, next: NextFunction) {
    const {
        customer_id,
        origin,
        destination,
        distance,
        duration,
        driver,
        value,
    } = req.body as IRideController.IRideConfirm;

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

const RideController = {
    postEstimate,
    postConfirm,
};

export default RideController;
