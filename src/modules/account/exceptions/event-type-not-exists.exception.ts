import { BadRequestException } from '@nestjs/common';

export class EventTypeNotExistsException extends BadRequestException {
  constructor() {
    super('event type not exists', {
      description: 'event type not exists',
    });
  }
}
