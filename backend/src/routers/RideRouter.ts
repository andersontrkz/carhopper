import { Router } from 'express';

import RideController from '@/controllers/ride.controller';
import { validateSchema } from '@/middlewares/validators';
import { rideEstimateSchema } from '@/middlewares/validators/schemas/rideEstimate';
import { ridesHistorySchema } from '@/middlewares/validators/schemas/ridesHistory';
import { rideConfirmSchema } from '@/middlewares/validators/schemas/rideConfirm';

const router = Router();

router.post('/estimate', validateSchema(rideEstimateSchema), RideController.postEstimate);
router.patch('/confirm', validateSchema(rideConfirmSchema), RideController.patchConfirm);
router.get('/:customer_id', validateSchema(ridesHistorySchema), RideController.getRidesHistory);

export default router;
