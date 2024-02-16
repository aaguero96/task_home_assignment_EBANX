import { AccountEntity } from '../../../infra/database/entities/account.entity';
import { EntityManager } from 'typeorm';

export const ACCOUNT_REPOSITORY = Symbol('ACCOUNT_REPOSITORY');

export interface IAccountRepository {
  create: (
    account: AccountEntity,
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
