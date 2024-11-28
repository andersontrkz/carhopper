import { type Schema } from "yup";
import { NextFunction, Request, Response } from "express";

export const validateSchema = (schema: Schema) => async (req: Request, _res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (error) {
      next(error);
  }
};
