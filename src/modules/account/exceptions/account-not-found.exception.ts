import { NotFoundException } from '@nestjs/common';

export class AccountNotFoundException extends NotFoundException {
  constructor() {
    super('account not found', {
      cause: new Error(),
      description: 'account not found',
    });
  }
}
