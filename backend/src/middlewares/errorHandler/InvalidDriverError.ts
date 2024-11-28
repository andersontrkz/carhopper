import { ValidationError } from "yup";

import { EErrorCode } from "@/types/interfaces/errors.interface";

import BaseError from "./BaseError"

export default class InvalidDriverError extends BaseError {
  constructor(error: ValidationError) {
    const message = error.errors.join(' - ')
    super(400, message, EErrorCode.INVALID_DRIVER);

    console.error({
      message: error,
      level: 'error',
    });
  }
}
