import { ApolloError } from 'apollo-server-errors';

export const APOLLO_UNKNOWN_CODE = 'UNKNOWN_ERROR';
const APOLLO_UNKNOWN_NAME = 'ApolloUnknownError';

export class ApolloUnknownError extends ApolloError {
  constructor(message: string = 'An unknown server error occurred', extensions: Record<string, any>) {
    super(message, APOLLO_UNKNOWN_CODE, extensions);
    Object.setPrototypeOf(this, ApolloUnknownError.prototype);
    Object.defineProperty(this, 'name', { value: APOLLO_UNKNOWN_NAME });
  }
}
