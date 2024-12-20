import dotenv from 'dotenv';
 
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import errorHandler from '@/middlewares/errorHandler';
import routers from '@/routers';

dotenv.config({ path: '../.env' });
 
const app = express();
 
app.use(morgan('tiny'));
 
app.use(cors());
 
app.use(helmet());
 
app.use(express.json());

app.use(routers);

app.use(errorHandler);
 
export default app;
