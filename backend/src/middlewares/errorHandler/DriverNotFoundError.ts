import { ValidationError } from "yup";

import { EErrorCode } from "@/types/interfaces/errors.interface";

import BaseError from "./BaseError"

export default class DriverNotFoundError extends BaseError {
  constructor(error: ValidationError) {
    const message = error.errors.join(' - ')
    super(404, message, EErrorCode.DRIVER_NOT_FOUND);

    console.error({
      message: error,
      level: 'error',
    });
  }
}
