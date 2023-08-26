import { ServerError } from './server-error';

export class NotFoundError extends ServerError {
  constructor(message: string = 'not-found') {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  response() {
    return {
      status: 404,
      message: this.message,
    };
  }
}
