import BaseError from "./BaseError"

import { EErrorCode } from "@/types/interfaces/errors.interface";

export default class InternalServerError extends BaseError {
  constructor(error: Error) {
    super(500, 'Erro inesperado', EErrorCode.INTERNAL_ERROR)

    console.error({
      message: error.message,
      stackTrace: error.stack,
      level: 'fatal',
    });
  }
};

