import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../../../infra/database/entities/account.entity';
import { ACCOUNT_REPOSITORY } from './account-repository.interface';
import { useClass } from '../../../shared/helpers/use-class.helper';
import { AccountRepository } from './account.repository';
import { AccountRecordEntity } from 'src/infra/database/entities/account-records.entity';
import { ACCOUNT_RECORD_REPOSITORY } from './account-record-repository.interface';
import { AccountRecordRepository } from './account-record.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, AccountRecordEntity])],
  providers: [
    useClass(ACCOUNT_REPOSITORY, AccountRepository),
    useClass(ACCOUNT_RECORD_REPOSITORY, AccountRecordRepository),
  ],
  exports: [ACCOUNT_REPOSITORY, ACCOUNT_RECORD_REPOSITORY],
})
export class AccountRepositoryModule {}
