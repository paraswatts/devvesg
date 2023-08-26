import { ServerError } from './server-error';

export class AuthorizationError extends ServerError {
  constructor(message: string = 'not-allowed') {
    super(message);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }

  response() {
    return {
      status: 403,
      message: this.message,
    };
  }
}
