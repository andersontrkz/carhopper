import { Request, Response, NextFunction } from 'express';

import { normalizeError } from './normalizeError';
import { ICustomError } from '../../interfaces/errors.interface';

interface IErrorHandler extends ICustomError, Error {};

const errorHandler = (err: IErrorHandler, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    const normalizedError = normalizeError(err);

    res.status(normalizedError.statusCode).send(normalizedError.getErrorBody());
};

export default errorHandler;
