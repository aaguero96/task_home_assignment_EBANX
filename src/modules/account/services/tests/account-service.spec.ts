import { AccountEntity } from 'src/infra/database/entities/account.entity';
import { IAccountDomain } from '../../domains/account-domain.interface';
import { IAccountRepository } from '../../repositories/account-repository.interface';
import { AccountService } from '../account.service';
import { mock, mockClear } from 'jest-mock-extended';
import { AccountNotFoundException } from '../../exceptions/account-not-found.exception';

describe('test AccountService class', () => {
  const accountRepositoryMock = mock<IAccountRepository>();
  const accountDomainMock = mock<IAccountDomain>();

  const accountService = new AccountService(
    accountRepositoryMock,
    accountDomainMock,
  );

  beforeEach(() => {
    mockClear(accountRepositoryMock);
    mockClear(accountDomainMock);
  });

  describe('test deposit method', () => {
    it('call findById by AccountRepository once with correct args', async () => {
      // MOCKS
      const fnFindById = accountRepositoryMock.findById.mockResolvedValue({
        id: '1',
        balance: 0,
      });

      // ACTUAL
      await accountService.deposit('1', 100);

      // EXPECT
      expect(fnFindById).toHaveBeenCalledWith('1');
      expect(fnFindById).toHaveBeenCalledTimes(1);
    });

    it('call create by AccountRepository once with correct args', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValue(null);
      const fnCreate = accountRepositoryMock.create.mockResolvedValue({
        id: '1',
        balance: 0,
      });

      // ACTUAL
      await accountService.deposit('1', 100);

      // EXPECT
      expect(fnCreate).toHaveBeenCalledWith(
        {
          id: '1',
          balance: 0,
        },
        undefined,
      );
      expect(fnCreate).toHaveBeenCalledTimes(1);
    });

    it('call depositValue by AccountDomain once with correct args', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValue({
        id: '1',
        balance: 0,
      });
      const fnDepositValue =
        accountDomainMock.depositValue.mockImplementation();

      // ACTUAL
      await accountService.deposit('1', 100);

      // EXPECT
      expect(fnDepositValue).toHaveBeenCalledWith(
        {
          id: '1',
          balance: 0,
        },
        100,
      );
      expect(fnDepositValue).toHaveBeenCalledTimes(1);
    });

    it('call depositValue by AccountDomain once with correct args', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValue({
        id: '1',
        balance: 0,
      });
      accountDomainMock.depositValue.mockImplementation(
        (account: AccountEntity, value: number) => {
          account.balance += value;
        },
      );
      const fnUpdateBalanceById =
        accountRepositoryMock.updateBalanceById.mockResolvedValue({
          id: '1',
          balance: 100,
        });

      // ACTUAL
      await accountService.deposit('1', 100);

      // EXPECT
      expect(fnUpdateBalanceById).toHaveBeenCalledWith('1', 100, undefined);
      expect(fnUpdateBalanceById).toHaveBeenCalledTimes(1);
    });

    it('return account after deposit', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValue({
        id: '1',
        balance: 0,
      });
      accountDomainMock.depositValue.mockImplementation(
        (account: AccountEntity, value: number) => {
          account.balance += value;
        },
      );
      accountRepositoryMock.updateBalanceById.mockResolvedValue({
        id: '1',
        balance: 100,
      });

      // ACTUAL
      const actual = await accountService.deposit('1', 100);

      // EXPECT
      expect(actual).toStrictEqual({ destination: { id: '1', balance: 100 } });
    });
  });

  describe('test withdraw method', () => {
    it('call findById by AccountRepository once with correct args', async () => {
      // MOCKS
      const fnFindById = accountRepositoryMock.findById.mockResolvedValue({
        id: '1',
        balance: 100,
      });

      // ACTUAL
      await accountService.withdraw('1', 25);

      // EXPECT
      expect(fnFindById).toHaveBeenCalledTimes(1);
      expect(fnFindById).toHaveBeenCalledWith('1');
    });

    it('call withdrawValue by AccountDomain once with correct args', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValue({
        id: '1',
        balance: 100,
      });
      const fnWithdrawValue =
        accountDomainMock.withdrawValue.mockImplementation();

      // ACTUAL
      await accountService.withdraw('1', 25);

      // EXPECT
      expect(fnWithdrawValue).toHaveBeenCalledTimes(1);
      expect(fnWithdrawValue).toHaveBeenCalledWith(
        { id: '1', balance: 100 },
        25,
      );
    });

    it('call updateBalanceById by AccountRepository once with correct args', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValue({
        id: '1',
        balance: 100,
      });
      accountDomainMock.withdrawValue.mockImplementation(
        (account: AccountEntity, value: number) => {
          account.balance -= value;
        },
      );
      const fnUpdateBalanceById =
        accountRepositoryMock.updateBalanceById.mockResolvedValue({
          id: '1',
          balance: 50,
        });

      // ACTUAL
      await accountService.withdraw('1', 25);

      // EXPECT
      expect(fnUpdateBalanceById).toHaveBeenCalledTimes(1);
      expect(fnUpdateBalanceById).toHaveBeenCalledWith('1', 75);
    });

    it('throw AccountNotFoundException if not have account', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValue(null);

      // ACTUAL
      const actual = accountService.withdraw('1', 25);

      // EXPECT
      await expect(actual).rejects.toThrow(AccountNotFoundException);
    });

    it('return account after withdraw', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValue({
        id: '1',
        balance: 100,
      });
      accountDomainMock.withdrawValue.mockImplementation(
        (account: AccountEntity, value: number) => {
          account.balance -= value;
        },
      );
      accountRepositoryMock.updateBalanceById.mockResolvedValue({
        id: '1',
        balance: 50,
      });

      // ACTUAL
      const actual = await accountService.withdraw('1', 25);

      // EXPECT
      expect(actual).toStrictEqual({ origin: { id: '1', balance: 75 } });
    });
  });

  describe('test transfer method', () => {
    it('call updateBalanceById by AccountRepository first time with correct args', async () => {
      // MOCKS
      const fnFindById = accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '1',
        balance: 100,
      });

      // ACTUAL
      await accountService.transfer('1', 25, '2');

      // EXPECT
      expect(fnFindById).toHaveBeenNthCalledWith(1, '1');
    });

    it('call updateBalanceById by AccountRepository second time with correct args', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '1',
        balance: 100,
      });
      const fnFindById = accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '2',
        balance: 0,
      });

      // ACTUAL
      await accountService.transfer('1', 25, '2');

      // EXPECT
      expect(fnFindById).toHaveBeenNthCalledWith(2, '2');
    });

    it('call updateBalanceById by AccountRepository two times', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '1',
        balance: 100,
      });
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '2',
        balance: 0,
      });

      // ACTUAL
      await accountService.transfer('1', 25, '2');

      // EXPECT
      expect(accountRepositoryMock.findById).toHaveBeenCalledTimes(2);
    });

    it('call create by AccountRepository once with correct args', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '1',
        balance: 100,
      });
      accountRepositoryMock.findById.mockResolvedValueOnce(null);
      const fnCreate = accountRepositoryMock.create.mockResolvedValue({
        id: '2',
        balance: 0,
      });

      // ACTUAL
      await accountService.transfer('1', 25, '2');

      // EXPECT
      expect(fnCreate).toHaveBeenCalledTimes(1);
      expect(fnCreate).toHaveBeenCalledWith(
        {
          id: '2',
          balance: 0,
        },
        undefined,
      );
    });

    it('call transferValue by AccountDomain once with correct args', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '1',
        balance: 100,
      });
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '2',
        balance: 0,
      });
      const fnTransferValue =
        accountDomainMock.transferValue.mockImplementation();

      // ACTUAL
      await accountService.transfer('1', 25, '2');

      // EXPECT
      expect(fnTransferValue).toHaveBeenCalledTimes(1);
      expect(fnTransferValue).toHaveBeenCalledWith(
        {
          id: '1',
          balance: 100,
        },
        25,
        {
          id: '2',
          balance: 0,
        },
      );
    });

    it('call updateBalanceById by AccountRepository first time with correct args', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '1',
        balance: 100,
      });
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '2',
        balance: 0,
      });
      accountDomainMock.transferValue.mockImplementation(
        (
          accountOrigin: AccountEntity,
          value: number,
          accountDestination: AccountEntity,
        ) => {
          accountOrigin.balance -= value;
          accountDestination.balance += value;
        },
      );
      const fnUpdateBalanceById =
        accountRepositoryMock.updateBalanceById.mockResolvedValueOnce({
          id: '1',
          balance: 75,
        });

      // ACTUAL
      await accountService.transfer('1', 25, '2');

      // EXPECT
      expect(fnUpdateBalanceById).toHaveBeenNthCalledWith(
        1,
        '1',
        75,
        undefined,
      );
    });

    it('call updateBalanceById by AccountRepository second time with correct args', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '1',
        balance: 100,
      });
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '2',
        balance: 0,
      });
      accountDomainMock.transferValue.mockImplementation(
        (
          accountOrigin: AccountEntity,
          value: number,
          accountDestination: AccountEntity,
        ) => {
          accountOrigin.balance -= value;
          accountDestination.balance += value;
        },
      );
      accountRepositoryMock.updateBalanceById.mockResolvedValueOnce({
        id: '1',
        balance: 75,
      });
      const fnUpdateBalanceById =
        accountRepositoryMock.updateBalanceById.mockResolvedValueOnce({
          id: '2',
          balance: 25,
        });

      // ACTUAL
      await accountService.transfer('1', 25, '2');

      // EXPECT
      expect(fnUpdateBalanceById).toHaveBeenNthCalledWith(
        2,
        '2',
        25,
        undefined,
      );
    });

    it('call updateBalanceById by AccountRepository two times', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '1',
        balance: 100,
      });
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '2',
        balance: 0,
      });
      accountDomainMock.transferValue.mockImplementation(
        (
          accountOrigin: AccountEntity,
          value: number,
          accountDestination: AccountEntity,
        ) => {
          accountOrigin.balance -= value;
          accountDestination.balance += value;
        },
      );
      accountRepositoryMock.updateBalanceById.mockResolvedValueOnce({
        id: '1',
        balance: 75,
      });
      accountRepositoryMock.updateBalanceById.mockResolvedValueOnce({
        id: '2',
        balance: 25,
      });

      // ACTUAL
      await accountService.transfer('1', 25, '2');

      // EXPECT
      expect(accountRepositoryMock.updateBalanceById).toHaveBeenCalledTimes(2);
    });

    it('throw AccountNotFoundException if not have account', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValue(null);

      // ACTUAL
      const actual = accountService.transfer('1', 25, '2');

      // EXPECT
      await expect(actual).rejects.toThrow(AccountNotFoundException);
    });

    it('return accounts after transfer', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '1',
        balance: 100,
      });
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '2',
        balance: 0,
      });
      accountDomainMock.transferValue.mockImplementation(
        (
          accountOrigin: AccountEntity,
          value: number,
          accountDestination: AccountEntity,
        ) => {
          accountOrigin.balance -= value;
          accountDestination.balance += value;
        },
      );
      accountRepositoryMock.updateBalanceById.mockResolvedValueOnce({
        id: '1',
        balance: 75,
      });
      accountRepositoryMock.updateBalanceById.mockResolvedValueOnce({
        id: '2',
        balance: 25,
      });

      // ACTUAL
      const actual = await accountService.transfer('1', 25, '2');

      // EXPECT
      expect(actual).toStrictEqual({
        origin: { id: '1', balance: 75 },
        destination: { id: '2', balance: 25 },
      });
    });
  });

  describe('test getBalanceById method', () => {
    it('call findById by AccountRepository once with correct args', async () => {
      // MOCKS
      const fnFindById = accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '1',
        balance: 100,
      });

      // ACTUAL
      await accountService.getBalanceById('1');

      // EXPECT
      expect(fnFindById).toHaveBeenCalledTimes(1);
      expect(fnFindById).toHaveBeenCalledWith('1');
    });

    it('throw AccountNotFoundException if not have account', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValue(null);

      // ACTUAL
      const actual = accountService.getBalanceById('1');

      // EXPECT
      await expect(actual).rejects.toThrow(AccountNotFoundException);
    });

    it('return account', async () => {
      // MOCKS
      accountRepositoryMock.findById.mockResolvedValueOnce({
        id: '1',
        balance: 100,
      });

      // ACTUAL
      const actual = await accountService.getBalanceById('1');

      // EXPECT
      expect(actual).toEqual(100);
    });
  });
});
