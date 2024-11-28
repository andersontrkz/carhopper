import RideService from '@/services/ride.service';
import { NextFunction, Request, Response } from 'express';

async function postEstimate(req: Request, res: Response, next: NextFunction) {
    try {
        const estimatedRide = await RideService.estimateRide(req.body);
        res.status(200).json(estimatedRide);
    } catch (error) {
        next(error);
    }
}

async function patchConfirm(req: Request, res: Response, next: NextFunction) {
    try {
        const estimatedRide = await RideService.confirmRide(req.body);
        res.status(200).json(estimatedRide);
    } catch (error) {
        next(error);
    }
}

async function getRidesHistory(req: Request, res: Response, next: NextFunction) {
    try {
        const estimatedRide = await RideService.ridesHistory(req.params as any, req.query as any);
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
