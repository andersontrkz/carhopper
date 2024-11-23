import { NextFunction, Request, Response } from 'express';

import RideService from '../services/ride.service';
import { type IRideEstimateRequest } from '../interfaces/ride.interface';

async function postEstimate(req: Request, res: Response, next: NextFunction) {
    const { origin, destination, customer_id } = req.body as IRideEstimateRequest;

    try {
        const estimatedRide = await RideService.estimateRide({ origin, destination });
        res.status(200).json(estimatedRide);
    } catch (error) {
        next(error);
    }
}

export default {
    postEstimate,
};
