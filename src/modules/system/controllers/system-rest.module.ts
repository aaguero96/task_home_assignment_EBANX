import { Module } from '@nestjs/common';
import { SystemServiceModule } from '../services/system-service.module';
import { SystemController } from './system-post.controller';

@Module({
  imports: [SystemServiceModule],
  controllers: [SystemController],
})
export class SystemControllerModule {}
