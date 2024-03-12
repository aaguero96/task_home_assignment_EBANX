import { UnauthorizedException } from '@nestjs/common';

export class UserUnauthorizedException extends UnauthorizedException {
  constructor() {
    super('invalid credentials', {
      description: 'invalid credentials',
    });
  }
}
