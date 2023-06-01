import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationError } from 'class-validator';

@Catch()
export class ValidationExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof ValidationError) {
      const validationError = exception.constraints;
      
      const message = Object.values(validationError);
      throw new HttpException(message, 400);
    } else {
      super.catch(exception, host);
    }
  }
}
