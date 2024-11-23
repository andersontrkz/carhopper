import { EErrorCode } from "../../interfaces/errors.interface";
import BaseError from "./BaseError"

export default class InternalServerError extends BaseError {
  constructor(error: Error) {
    super(500, 'An unexpected error occurred', EErrorCode.INTERNAL_ERROR)

    console.error({
      message: error.message,
      stackTrace: error.stack,
      level: 'fatal',
    });
  }
};

