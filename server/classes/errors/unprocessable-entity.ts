import { ServerError } from './server-error';

export class UnprocessableEntityError extends ServerError {
  constructor(message: string = 'request-could-not-be-processed') {
    super(message);
    Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
  }

  response() {
    return {
      status: 422,
      message: this.message,
    };
  }
}
