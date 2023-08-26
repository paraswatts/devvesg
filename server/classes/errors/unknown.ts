import { ServerError } from './server-error';

export class UnknownError extends ServerError {
  constructor(message: string = 'unknown-error') {
    super(message);
    Object.setPrototypeOf(this, UnknownError.prototype);
  }

  response() {
    return {
      status: 500,
      message: this.message,
    };
  }
}
