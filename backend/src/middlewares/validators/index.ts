import { NextFunction, Request, Response } from "express";
import { Schema } from "yup";

export const validateSchema = (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
        next(error);
    }
};
