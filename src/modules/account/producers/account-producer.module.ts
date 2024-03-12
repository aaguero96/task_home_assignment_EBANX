import { Module } from '@nestjs/common';
import { useClass } from '../../../shared/helpers/use-class.helper';
import { ACCOUNT_PRODUCER } from './account-producer.interface';
import { AccountProducer } from './account.producer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({ name: 'ACCOUNT_QUEUE' })],
  providers: [useClass(ACCOUNT_PRODUCER, AccountProducer)],
  exports: [ACCOUNT_PRODUCER],
})
export class AccountProducerModule {}
