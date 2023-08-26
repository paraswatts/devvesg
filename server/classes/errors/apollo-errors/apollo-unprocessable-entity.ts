import { ApolloError } from 'apollo-server-errors';

const APOLLO_UNPROCESSABLE_ENTITY_CODE = 'UNPROCESSABLE_ENTITY_ERROR';
const APOLLO_UNPROCESSABLE_ENTITY_NAME = 'ApolloUnprocessableEntityError';

export class ApolloUnprocessableEntityError extends ApolloError {
  constructor(message: string = 'Your request could not be processed', extensions: Record<string, any>) {
    super(message, APOLLO_UNPROCESSABLE_ENTITY_CODE, extensions);
    Object.setPrototypeOf(this, ApolloUnprocessableEntityError.prototype);
    Object.defineProperty(this, 'name', { value: APOLLO_UNPROCESSABLE_ENTITY_NAME });
  }
}
