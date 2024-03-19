import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class RequestInvalidException extends BadRequestException {
  constructor(errors: ValidationError[]) {
    const errorResponse = errors
      .map(({ constraints }) => Object.values(constraints))
      .flat();
    super(errorResponse.join(', '), {
      description: 'request error',
    });
  }
}
