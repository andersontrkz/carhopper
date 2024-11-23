import { EErrorCode } from "../../interfaces/errors.interface";
import BaseError from "./BaseError"

export default class RetrievingDataError extends BaseError {
  constructor(error: Error) {
    super(400, 'An error occurred while retrieving data', EErrorCode.RETRIEVING_DATA_ERROR);

    console.error({
      message: error.message,
      level: 'error',
    });
  }
}
