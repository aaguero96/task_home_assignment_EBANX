import { mock, mockClear } from 'jest-mock-extended';
import { AccountGetController } from '../gets/account-get.controller';
import { IAccountService } from '../../services/account-service.interface';
import { mockRes } from '../../../../shared/helpers/mock-res.helper';

describe('test AccountGetController class', () => {
  const accountServiceMock = mock<IAccountService>();

  const accountController = new AccountGetController(accountServiceMock);

  beforeEach(() => {
    mockClear(accountServiceMock);
    jest.clearAllMocks();
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
