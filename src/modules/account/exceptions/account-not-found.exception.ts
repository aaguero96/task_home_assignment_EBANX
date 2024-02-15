import { NotFoundException } from '@nestjs/common';

export class AccountNotFoundException extends NotFoundException {
  constructor() {
    super('account not found', {
      description: 'account not found',
    });
  }
}
