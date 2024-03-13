import { AccountRecordEntity } from 'src/infra/database/entities/account-records.entity';
import { DeepPartial, EntityManager } from 'typeorm';

export const ACCOUNT_RECORD_REPOSITORY = Symbol('ACCOUNT_RECORD_REPOSITORY');

export interface IAccontRecordRepository {
  create: (
    record: DeepPartial<AccountRecordEntity>,
    manager?: EntityManager,
  ) => Promise<void>;
  accountSummary: (accountId: string) => Promise<AccountRecordEntity[]>;
}
