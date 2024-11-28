import { ValidationError } from "yup";

import { EErrorCode } from "@/types/interfaces/errors.interface";

import BaseError from "./BaseError"

export default class InvalidDataError extends BaseError {
  constructor(error: ValidationError) {
    const message = error.errors.join(' - ')
    super(400, message, EErrorCode.INVALID_DATA);

    console.error({
      message: error,
      level: 'error',
    });
  }
}
