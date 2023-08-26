import { ApolloError } from 'apollo-server-errors';

export const APOLLO_AUTHENTICATION_CODE = 'AUTHENTICATION_ERROR';
const APOLLO_AUTHENTICATION_NAME = 'ApolloAuthenticationError';

export class ApolloAuthenticationError extends ApolloError {
  constructor(message: string = 'You must be logged in to do this') {
    super(message, APOLLO_AUTHENTICATION_CODE);
    Object.setPrototypeOf(this, ApolloAuthenticationError.prototype);
    Object.defineProperty(this, 'name', { value: APOLLO_AUTHENTICATION_NAME });
  }
}
