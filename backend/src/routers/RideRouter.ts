import { Router } from 'express';

import RideController from '../controllers/ride.controller';
import { validateSchema } from '../middlewares/validators';
import { rideEstimateSchema } from '../schemas/rideEstimate';

const router = Router();

router.post('/estimate', validateSchema(rideEstimateSchema), RideController.postEstimate);
router.patch('/confirm', validateSchema(rideEstimateSchema), RideController.patchConfirm);
router.get('/:customer_id', validateSchema(rideEstimateSchema), RideController.getRidesHistory);

export default router;
