import { Module } from '@nestjs/common';
import { SystemServiceModule } from '../services/system-service.module';
import { SystemPostController } from './posts/system-post.controller';

@Module({
  imports: [SystemServiceModule],
  controllers: [SystemPostController],
})
export class SystemRestModule {}
