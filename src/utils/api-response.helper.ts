import { RESPONSE_MESSAGES, RESPONSE_STATUS } from './constants';

export class ApiResponseHelper {
  static ok<T>(message = '', data: T[] = []) {
    return {
      status: RESPONSE_STATUS.OK,
      message,
      data,
    };
  }

  static error(error: unknown = null) {
    return {
      status: RESPONSE_STATUS.ERROR,
      message: RESPONSE_MESSAGES.SOMETHING_WENT_WRONG,
      error,
    };
  }
}
