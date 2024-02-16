import { AccountEntity } from '../../../infra/database/entities/account.entity';
import { IAccountDomain } from './account-domain.interface';
import { InsufficientFundsException } from '../exceptions/insufficient-funds.exception';

export class AccountDomain implements IAccountDomain {
  depositValue = (account: AccountEntity, value: number): void => {
    account.balance += value;
  };

  withdrawValue = (account: AccountEntity, value: number): void => {
    if (account.balance < value) {
      throw new InsufficientFundsException();
    }

    account.balance -= value;
  };

  transferValue = (
    accountOrigin: AccountEntity,
    value: number,
    accountDestination: AccountEntity,
  ): void => {
    if (accountOrigin.balance < value) {
      throw new InsufficientFundsException();
    }

    accountOrigin.balance -= value;
    accountDestination.balance += value;
  };
}
