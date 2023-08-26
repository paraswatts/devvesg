import {
  DriverException,
  NotFoundError as OrmNotFoundError,
  OptimisticLockError,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import {
  FormValidationError,
  ServerError,
  ServerErrorResponse,
  UnknownError,
  NotFoundError,
  UnprocessableEntityError,
} from './classes/errors';
import { logger } from './logger';
import { MulterError } from 'multer';

export const errorMiddleware = (error: Error, req: Request, res: Response<ServerErrorResponse>, next: NextFunction) => {
  logger.error(parseLogError(error));

  if (error instanceof DriverException) {
    logger.error('Fatal database access', error.name);
    error = new UnknownError();
  }

  if (error instanceof OptimisticLockError) {
    // https://mikro-orm.io/docs/transactions/#optimistic-locking
    error = new UnprocessableEntityError('This resource can not be updated by multiple resources simultaneously');
  } else if (error instanceof OrmNotFoundError) {
    error = new NotFoundError();
  } else if (error instanceof ZodError) {
    error = new FormValidationError('Form validation error', error.issues);
  } else if (error instanceof UniqueConstraintViolationException) {
    error = new UnprocessableEntityError('A record with that identifier already exists');
  } else if (error instanceof MulterError) {
    let message = error.message;
    if (error.code === 'LIMIT_FILE_SIZE' && error.field === 'logo') {
      message = 'Image exceeds maximum allowed file size of 1MB';
    } else if (error.code === 'LIMIT_FILE_SIZE' && error.field === 'file') {
      message = 'File exceeds maximum allowed file size of 5MB';
    }
    error = new UnprocessableEntityError(message);
  }

  if (error instanceof ServerError === false) {
    logger.error('Encountered an unknown or unhandled server error', error.name);
    error = new UnknownError();
  }

  if (error instanceof ServerError) {
    const errorResponse = error.response();
    res.status(errorResponse.status).send(errorResponse);
  }

  next();
};

// Convert an error to a string. Show stack trace if available, otherwise show just the error name / message
export const parseLogError = (error: Error) => {
  if (error.stack) {
    return error.stack;
  } else {
    return [error.name, error.message].join(': ');
  }
};
