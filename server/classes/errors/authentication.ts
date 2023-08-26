import { ServerError } from './server-error';

export class AuthenticationError extends ServerError {
  constructor(message: string = 'not-logged-in') {
    super(message);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }

  response() {
    return {
      status: 401,
      message: this.message,
    };
  }
}
