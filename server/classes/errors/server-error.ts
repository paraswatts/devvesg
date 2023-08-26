export interface ServerErrorResponse {
  status: number;
  message: string;
}

export abstract class ServerError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ServerError.prototype);
  }

  abstract response(): ServerErrorResponse;
}
