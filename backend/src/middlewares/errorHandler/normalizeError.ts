import { ValidationError } from "yup";

import BaseError from "./BaseError"
import InternalServerError from "./InternalServerError"
import InvalidDataError from "./InvalidDataError";

export const normalizeError = (error: Error) => {
  if (error instanceof BaseError) {
    return error;
  }

  if (error instanceof ValidationError) {
    return new InvalidDataError(error);
  }

  return new InternalServerError(error);
};
