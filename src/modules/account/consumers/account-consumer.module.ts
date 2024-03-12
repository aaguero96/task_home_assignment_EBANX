import { Module } from '@nestjs/common';
import { AccountServiceModule } from '../services/account-service.module';
import { useClass } from 'src/shared/helpers/use-class.helper';
import { ACCOUNT_CONSUMER } from './account-consumer.interface';
import { AccountConsumer } from './account.consumer';

@Module({
  imports: [AccountServiceModule],
  providers: [useClass(ACCOUNT_CONSUMER, AccountConsumer)],
})
export class AccountConsumerModule {}
