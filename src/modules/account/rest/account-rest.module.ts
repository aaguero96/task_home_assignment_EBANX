import { Module } from '@nestjs/common';
import { AccountServiceModule } from '../services/account-service.module';
import { AccountPostController } from './posts/account-post.controller';
import { AccountGetController } from './gets/account-get.controller';

@Module({
  imports: [AccountServiceModule],
  controllers: [AccountPostController, AccountGetController],
})
export class AccountRestModule {}
