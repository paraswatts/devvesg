import { ApolloError } from 'apollo-server-errors';
import { ZodIssue } from 'zod';

const APOLLO_FORM_VALIDATION_CODE = 'FORM_VALIDATION_ERROR';
const APOLLO_FORM_VALIDATION_NAME = 'ApolloFormValidationError';

export class ApolloFormValidationError extends ApolloError {
  constructor(message: string = 'Form validation error', extensions: Record<string, any>, issues: ZodIssue[]) {
    extensions = { ...extensions, ...{ issues } };
    super(message, APOLLO_FORM_VALIDATION_CODE, extensions);
    Object.setPrototypeOf(this, ApolloFormValidationError.prototype);
    Object.defineProperty(this, 'name', { value: APOLLO_FORM_VALIDATION_NAME });
  }
}
