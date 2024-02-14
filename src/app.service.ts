import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly _config: ConfigService) {}

  getHello(): string {
    return this._config.get('NODE_VERSION');
  }
}
