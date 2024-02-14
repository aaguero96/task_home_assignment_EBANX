import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AccountNotFoundException } from '../exceptions/account-not-found.exception';
import { Response } from 'express';

@Catch(AccountNotFoundException)
export class AccountNotFoundFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return response.status(HttpStatus.NOT_FOUND).json(0);
  }
}
