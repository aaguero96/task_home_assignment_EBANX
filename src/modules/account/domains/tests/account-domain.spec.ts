import { InsufficientFundsException } from '../../exceptions/insufficient-funds.exception';
import { AccountDomain } from '../account.domain';

describe('test AccountDomain class', () => {
  const accountDomain = new AccountDomain();

  describe('test depositValue method', () => {
    it('change balance of account', () => {
      const account = { id: '1', balance: 0 };
      accountDomain.depositValue(account, 100);
      expect(account).toStrictEqual({ id: '1', balance: 100 });
    });
  });

  describe('test withdrawValue method', () => {
    it('change balance of account if sufficient balance', () => {
      const account = { id: '1', balance: 100 };
      accountDomain.withdrawValue(account, 25);
      expect(account).toStrictEqual({ id: '1', balance: 75 });
    });

    it('throw InsufficientFundsException in case of isufficient balance', () => {
      const account = { id: '1', balance: 0 };
      expect(() => accountDomain.withdrawValue(account, 25)).toThrow(
        InsufficientFundsException,
      );
    });
  });

  describe('test transferValue method', () => {
    it('change balance of account if sufficient balance', () => {
      const originAccount = { id: '1', balance: 100 };
      const destinationAccount = { id: '2', balance: 0 };
      accountDomain.transferValue(originAccount, 25, destinationAccount);
      expect(originAccount).toStrictEqual({ id: '1', balance: 75 });
      expect(destinationAccount).toStrictEqual({ id: '2', balance: 25 });
    });

    it('throw InsufficientFundsException in case of isufficient balance', () => {
      const originAccount = { id: '1', balance: 0 };
      const destinationAccount = { id: '2', balance: 0 };
      expect(() =>
        accountDomain.transferValue(originAccount, 25, destinationAccount),
      ).toThrow(InsufficientFundsException);
    });
  });
});
