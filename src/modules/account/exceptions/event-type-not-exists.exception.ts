import { BadRequestException } from '@nestjs/common';

export class EventTypeNotExistsException extends BadRequestException {
  constructor() {
    super('event type not exists', {
      cause: new Error(),
      description: 'event type not exists',
    });
  }
}
