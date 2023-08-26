import { ApolloError } from 'apollo-server-errors';

export const APOLLO_NOT_FOUND_CODE = 'NOT_FOUND_ERROR';
const APOLLO_NOT_FOUND_NAME = 'ApolloNotFoundError';

export class ApolloNotFoundError extends ApolloError {
  constructor(message: string = 'Not found', extensions: Record<string, any>) {
    super(message, APOLLO_NOT_FOUND_CODE, extensions);
    Object.setPrototypeOf(this, ApolloNotFoundError.prototype);
    Object.defineProperty(this, 'name', { value: APOLLO_NOT_FOUND_NAME });
  }
}
