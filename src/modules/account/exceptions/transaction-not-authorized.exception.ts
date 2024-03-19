import { UnauthorizedException } from '@nestjs/common';

export class TransactionNotAuthorized extends UnauthorizedException {
  constructor() {
    super('transaction not authorized', {
      description: 'transaction not authorized',
    });
  }
}
