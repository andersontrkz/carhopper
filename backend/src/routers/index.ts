import { Router } from 'express';

import RideRouter from './RideRouter';

const router = Router();

router.use('/ride', RideRouter);

export default router;
