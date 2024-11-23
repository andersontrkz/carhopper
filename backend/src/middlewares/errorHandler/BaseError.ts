import { type ICustomError, type EErrorCode } from "../../interfaces/errors.interface";

class BaseError extends Error {
  statusCode: number;
  errorCode: any;

  constructor(statusCode: number, message: string, errorCode: EErrorCode) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }

  getErrorBody(): ICustomError {
    return {
      error_code: this.errorCode,
      error_description: this.message,
    };
  }
}

export default BaseError;
