import { Module } from '@nestjs/common';
import { AccountServiceModule } from '../services/account-service.module';
import { AccountController } from './account.controller';

@Module({
  imports: [AccountServiceModule],
  controllers: [AccountController],
})
export class AccountControllerModule {}
