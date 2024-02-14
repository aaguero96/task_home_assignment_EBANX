import { BadRequestException } from '@nestjs/common';

export class InsufficientFundsException extends BadRequestException {
  constructor() {
    super('insufficient funds', {
      cause: new Error(),
      description: 'insufficient funds',
    });
  }
}
