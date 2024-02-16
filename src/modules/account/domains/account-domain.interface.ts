import { AccountEntity } from '../../../infra/database/entities/account.entity';

export const ACCOUNT_DOMAIN = Symbol('ACCOUNT_DOMAIN');

export interface IAccountDomain {
  depositValue: (account: AccountEntity, value: number) => void;
  withdrawValue: (account: AccountEntity, value: number) => void;
  transferValue: (
    accountOrigin: AccountEntity,
    value: number,
    accountDestination: AccountEntity,
  ) => void;
}
