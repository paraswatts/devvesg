import {
  DriverException,
  NotFoundError,
  OptimisticLockError,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import { ApolloError } from 'apollo-server-errors';
import { GraphQLError } from 'graphql';
import { MulterError } from 'multer';
import { ZodError } from 'zod';

import {
  ApolloFormValidationError,
  ApolloNotFoundError,
  ApolloUnknownError,
  ApolloUnprocessableEntityError,
} from '../classes/errors';
import { logger } from '../logger';

export const formatError = (err: GraphQLError) => {
  if (err.originalError instanceof DriverException) {
    // Log database access errors
    err = new ApolloUnknownError('Fatal database access', err.extensions);
    logger.error('Fatal database access');
    logger.error(err.stack);
  } else if (err.originalError instanceof OptimisticLockError) {
    // https://mikro-orm.io/docs/transactions/#optimistic-locking
    err = new ApolloUnprocessableEntityError(
      'This resource can not be updated by multiple resources simultaneously',
      err.extensions,
    );
  } else if (err.originalError instanceof NotFoundError) {
    err = new ApolloNotFoundError(err.originalError.message, err.extensions);
  } else if (err.originalError instanceof ZodError) {
    err = new ApolloFormValidationError('Form validation error', err.extensions, err.originalError.issues);
  } else if (err.originalError instanceof UniqueConstraintViolationException) {
    err = new ApolloUnprocessableEntityError('A record with that identifier already exists', err.extensions);
  } else if (err.originalError instanceof MulterError) {
    let message = err.originalError.message;
    if (err.originalError.code === 'LIMIT_FILE_SIZE' && err.originalError.field === 'logo') {
      message = 'Image exceeds maximum allowed file size of 1MB';
    }
    err = new ApolloUnprocessableEntityError(message, err.extensions);
  } else if (!(err.originalError instanceof ApolloError)) {
    logger.error('Unknown server error');
    logger.error(err);
    if (err.stack) {
      logger.error(err.stack);
    }
    if (err.extensions) {
      logger.error(JSON.stringify(err.extensions));
    }
    err = new ApolloUnknownError(null, err.extensions);
  }

  return err;
};
