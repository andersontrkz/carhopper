import { ValidationError } from "yup";

import { EErrorCode } from "@/types/interfaces/errors.interface";

import BaseError from "./BaseError"

export default class NoRidesFoundError extends BaseError {
  constructor(error: ValidationError) {
    const message = error.errors.join(' - ')
    super(404, message, EErrorCode.NO_RIDES_FOUND);

    console.error({
      message: error,
      level: 'error',
    });
  }
}
