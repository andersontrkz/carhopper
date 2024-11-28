import { ValidationError } from "yup";

import { EErrorCode } from "@/types/interfaces/errors.interface";

import BaseError from "./BaseError"

export default class InvalidDistanceError extends BaseError {
  constructor(error: ValidationError) {
    const message = error.errors.join(' - ')
    super(406, message, EErrorCode.INVALID_DISTANCE);

    console.error({
      message: error,
      level: 'error',
    });
  }
}
