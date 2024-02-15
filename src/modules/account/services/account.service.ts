import { Inject, Injectable } from '@nestjs/common';
import { DepositResponseDTO } from '../dtos/deposit-reponse.dto';
import { TransferResponseDTO } from '../dtos/transfer-response.dto';
import { WithdrawResponseDTO } from '../dtos/withdraw-response.dto';
import { IAccountService } from './account-service.interface';
import {
  ACCOUNT_REPOSITORY,
  IAccountRepository,
} from '../repositories/account-repository.interface';
import {
  ACCOUNT_DOMAIN,
  IAccountDomain,
} from '../domains/account-domain.interface';
import { AccountNotFoundException } from '../exceptions/account-not-found.exception';
import { EntityManager } from 'typeorm';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepo: IAccountRepository,
    @Inject(ACCOUNT_DOMAIN) private readonly _accountDomain: IAccountDomain,
  ) {}

  deposit = async (
    destination: string,
    amount: number,
    manager?: EntityManager,
  ): Promise<DepositResponseDTO> => {
    let destinationAccount = await this._accountRepo.findById(destination);

    if (!destinationAccount) {
      destinationAccount = await this._accountRepo.create(
        {
          id: destination,
          balance: 0,
        },
        manager,
      );
    }

    this._accountDomain.depositValue(destinationAccount, amount);

    await this._accountRepo.updateBalanceById(
      destinationAccount.id,
      destinationAccount.balance,
      manager,
    );

    return {
      destination: destinationAccount,
    };
  };

  withdraw = async (
    origin: string,
    amount: number,
  ): Promise<WithdrawResponseDTO> => {
    const originAccount = await this._accountRepo.findById(origin);

    if (!originAccount) {
      throw new AccountNotFoundException();
    }

    this._accountDomain.withdrawValue(originAccount, amount);

    await this._accountRepo.updateBalanceById(
      originAccount.id,
      originAccount.balance,
    );

    return {
      origin: originAccount,
    };
  };

  transfer = async (
    origin: string,
    amount: number,
    destination: string,
    manager?: EntityManager,
  ): Promise<TransferResponseDTO> => {
    const originAccount = await this._accountRepo.findById(origin);
    if (!originAccount) {
      throw new AccountNotFoundException();
    }

    let destinationAccount = await this._accountRepo.findById(destination);
    if (!destinationAccount) {
      destinationAccount = await this._accountRepo.create(
        {
          id: destination,
          balance: 0,
        },
        manager,
      );
    }

    this._accountDomain.transferValue(
      originAccount,
      amount,
      destinationAccount,
    );

    await this._accountRepo.updateBalanceById(
      originAccount.id,
      originAccount.balance,
      manager,
    );

    await this._accountRepo.updateBalanceById(
      destinationAccount.id,
      destinationAccount.balance,
      manager,
    );

    return {
      origin: originAccount,
      destination: destinationAccount,
    };
  };

  getBalanceById = async (accountId: string): Promise<number> => {
    const account = await this._accountRepo.findById(accountId);
    if (!account) {
      throw new AccountNotFoundException();
    }

    return account.balance;
  };
}
