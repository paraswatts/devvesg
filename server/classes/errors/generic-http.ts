import { ServerError } from './server-error';

export class GenericHttpError extends ServerError {
  status: number;

  constructor(message: string, status: number = 500) {
    super(message);
    Object.setPrototypeOf(this, GenericHttpError.prototype);
    this.status = status;
  }

  response() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}
