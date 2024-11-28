import { EErrorCode } from "@/types/interfaces/errors.interface";

import BaseError from "./BaseError"

export default class RetrievingDataError extends BaseError {
  constructor(error: Error) {
    super(400, 'Um erro ocorreu ao tentar recuperar as informações', EErrorCode.RETRIEVING_DATA_ERROR);

    console.error({
      message: error.message,
      level: 'error',
    });
  }
}
