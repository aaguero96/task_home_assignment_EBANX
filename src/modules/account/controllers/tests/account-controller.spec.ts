import { mock, mockClear } from 'jest-mock-extended';
import { IAccountService } from '../../services/account-service.interface';
import { EventTypeNotExistsException } from '../../exceptions/event-type-not-exists.exception';
import { mockRes } from '../../../../shared/helpers/mock-res.helper';
import { createDataSourceMock } from '../../../../shared/helpers/create-data-source-mock.helper';
import { AccountController } from '../account.controller';

describe('test AccountController', () => {
  const accountServiceMock = mock<IAccountService>();

  const {
    dataSourceMock,
    createQueryRunnerMock,
    connectMock,
    startTransactionMock,
    managerMock,
    commitTransactionMock,
    releaseMock,
    rollbackTransactionMock,
  } = createDataSourceMock();

  const accountController = new AccountController(
    accountServiceMock,
    dataSourceMock,
  );

  beforeEach(() => {
    mockClear(accountServiceMock);
    jest.clearAllMocks();
  });

  describe('test event method', () => {
    it('call createQueryRunner by dataSource once with correct args', async () => {
      // MOCKS
      const res = mockRes();

      // ACTUAL
      await accountController.event(res, {
        type: 'deposit',
        destination: '1',
        amount: 100,
      });

      // EXPECT
      expect(createQueryRunnerMock).toHaveBeenCalledTimes(1);
      expect(createQueryRunnerMock).toHaveBeenCalledWith();
    });

    it('call connect by createQueryRunner once with correct args', async () => {
      // MOCKS
      const res = mockRes();

      // ACTUAL
      await accountController.event(res, {
        type: 'deposit',
        destination: '1',
        amount: 100,
      });

      // EXPECT
      expect(connectMock).toHaveBeenCalledTimes(1);
      expect(connectMock).toHaveBeenCalledWith();
    });

    it('call startTransaction by createQueryRunner once with correct args', async () => {
      // MOCKS
      const res = mockRes();

      // ACTUAL
      await accountController.event(res, {
        type: 'deposit',
        destination: '1',
        amount: 100,
      });

      // EXPECT
      expect(startTransactionMock).toHaveBeenCalledTimes(1);
      expect(startTransactionMock).toHaveBeenCalledWith();
    });

    it('call release by createQueryRunner once with correct args', async () => {
      // MOCKS
      const res = mockRes();

      // ACTUAL
      await accountController.event(res, {
        type: 'deposit',
        destination: '1',
        amount: 100,
      });

      // EXPECT
      expect(releaseMock).toHaveBeenCalledTimes(1);
      expect(releaseMock).toHaveBeenCalledWith();
    });

    describe('type deposit', () => {
      it('call deposit by AccountService once with correct args', async () => {
        // MOCKS
        const res = mockRes();
        const fnDeposit = accountServiceMock.deposit.mockResolvedValue({
          destination: { id: '1', balance: 100 },
        });

        // ACTUAL
        await accountController.event(res, {
          type: 'deposit',
          destination: '1',
          amount: 100,
        });

        // EXPECT
        expect(fnDeposit).toHaveBeenCalledTimes(1);
        expect(fnDeposit).toHaveBeenCalledWith('1', 100, managerMock);
      });

      it('call commitTransaction by querryRunner once with correct args', async () => {
        // MOCKS
        const res = mockRes();
        accountServiceMock.deposit.mockResolvedValue({
          destination: { id: '1', balance: 100 },
        });

        // ACTUAL
        await accountController.event(res, {
          type: 'deposit',
          destination: '1',
          amount: 100,
        });

        // EXPECT
        expect(commitTransactionMock).toHaveBeenCalledTimes(1);
        expect(commitTransactionMock).toHaveBeenCalledWith();
      });

      it('response destination as send and status 201', async () => {
        // MOCKS
        const res = mockRes();
        accountServiceMock.deposit.mockResolvedValue({
          destination: { id: '1', balance: 100 },
        });

        // ACTUAL
        await accountController.event(res, {
          type: 'deposit',
          destination: '1',
          amount: 100,
        });

        // EXPECT
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
          destination: { id: '1', balance: 100 },
        });
      });
    });

    describe('type withdraw', () => {
      it('call withdraw by AccountService once with correct args', async () => {
        // MOCKS
        const res = mockRes();
        const fnWithdraw = accountServiceMock.withdraw.mockResolvedValue({
          origin: { id: '1', balance: 100 },
        });

        // ACTUAL
        await accountController.event(res, {
          type: 'withdraw',
          origin: '1',
          amount: 100,
        });

        // EXPECT
        expect(fnWithdraw).toHaveBeenCalledTimes(1);
        expect(fnWithdraw).toHaveBeenCalledWith('1', 100);
      });

      it('response destination as send and status 201', async () => {
        // MOCKS
        const res = mockRes();
        accountServiceMock.withdraw.mockResolvedValue({
          origin: { id: '1', balance: 100 },
        });

        // ACTUAL
        await accountController.event(res, {
          type: 'withdraw',
          origin: '1',
          amount: 100,
        });

        // EXPECT
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
          origin: { id: '1', balance: 100 },
        });
      });
    });

    describe('type transfer', () => {
      it('call transfer by AccountService once with correct args', async () => {
        // MOCKS
        const res = mockRes();
        const fnTransfer = accountServiceMock.transfer.mockResolvedValue({
          origin: { id: '1', balance: 100 },
          destination: { id: '2', balance: 25 },
        });

        // ACTUAL
        await accountController.event(res, {
          type: 'transfer',
          origin: '1',
          amount: 25,
          destination: '2',
        });

        // EXPECT
        expect(fnTransfer).toHaveBeenCalledTimes(1);
        expect(fnTransfer).toHaveBeenCalledWith('1', 25, '2', managerMock);
      });

      it('call commitTransaction by querryRunner once with correct args', async () => {
        // MOCKS
        const res = mockRes();
        accountServiceMock.transfer.mockResolvedValue({
          origin: { id: '1', balance: 100 },
          destination: { id: '2', balance: 25 },
        });

        // ACTUAL
        await accountController.event(res, {
          type: 'transfer',
          origin: '1',
          amount: 25,
          destination: '2',
        });

        // EXPECT
        expect(commitTransactionMock).toHaveBeenCalledTimes(1);
        expect(commitTransactionMock).toHaveBeenCalledWith();
      });

      it('response destination as send and status 201', async () => {
        // MOCKS
        const res = mockRes();
        accountServiceMock.transfer.mockResolvedValue({
          origin: { id: '1', balance: 100 },
          destination: { id: '2', balance: 25 },
        });

        // ACTUAL
        await accountController.event(res, {
          type: 'transfer',
          origin: '1',
          amount: 25,
          destination: '2',
        });

        // EXPECT
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
          origin: { id: '1', balance: 100 },
          destination: { id: '2', balance: 25 },
        });
      });
    });

    describe('type not exists', () => {
      it('call rollbackTransaction by querryRunner once with correct args', async () => {
        // MOCKS
        const res = mockRes();

        try {
          // ACTUAL
          await accountController.event(res, {
            type: 'something that doesnt exist',
          });
        } catch (e) {
          // EXPECT
          expect(rollbackTransactionMock).toHaveBeenCalledTimes(1);
          expect(rollbackTransactionMock).toHaveBeenCalledWith();
        }
      });

      it('throw EventTypeNotExistsException', async () => {
        // MOCKS
        const res = mockRes();
        accountServiceMock.transfer.mockResolvedValue({
          origin: { id: '1', balance: 100 },
          destination: { id: '2', balance: 25 },
        });

        // ACTUAL
        const actual = accountController.event(res, {
          type: 'something that doesnt exist',
        });

        // EXPECT
        await expect(actual).rejects.toThrow(EventTypeNotExistsException);
      });
    });
  });

  describe('test getBalance method', () => {
    it('call getBalanceById by AccountService once with correct args', async () => {
      // MOCKS
      const res = mockRes();
      const fnGetBalanceById =
        accountServiceMock.getBalanceById.mockResolvedValue(100);

      // ACTUAL
      await accountController.getBalance(res, '1');

      // EXPECT
      expect(fnGetBalanceById).toHaveBeenCalledTimes(1);
      expect(fnGetBalanceById).toHaveBeenCalledWith('1');
    });

    it('response balance as json and status 200', async () => {
      // MOCKS
      const res = mockRes();
      accountServiceMock.getBalanceById.mockResolvedValue(100);

      // ACTUAL
      await accountController.getBalance(res, '1');

      // EXPECT
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(100);
    });
  });
});
