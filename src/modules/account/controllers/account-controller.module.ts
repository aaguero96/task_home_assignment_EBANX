import { Module } from '@nestjs/common';
import { AccountServiceModule } from '../services/account-service.module';
import { AccountController } from './account.controller';
import { AccountProducerModule } from '../producers/account-producer.module';

@Module({
  imports: [AccountServiceModule, AccountProducerModule],
  controllers: [AccountController],
})
export class AccountControllerModule {}
