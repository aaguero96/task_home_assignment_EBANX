import { AccountEntity } from '../../../infra/database/entities/account.entity';
import { DeepPartial, EntityManager } from 'typeorm';

export const ACCOUNT_REPOSITORY = Symbol('ACCOUNT_REPOSITORY');

export interface IAccountRepository {
  create: (
    account: DeepPartial<AccountEntity>,
    manager?: EntityManager,
  ) => Promise<AccountEntity>;
  updateBalanceById: (
    accountId: string,
    newBalance: number,
    manager?: EntityManager,
  ) => Promise<AccountEntity>;
  findById: (
    accountId: string,
    manager?: EntityManager,
  ) => Promise<AccountEntity>;
  reset: (manager?: EntityManager) => Promise<void>;
}
