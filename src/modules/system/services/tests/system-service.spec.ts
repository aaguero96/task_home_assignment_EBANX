import { mock, mockClear } from 'jest-mock-extended';
import { SystemService } from '../system.service';
import { IAccountRepository } from '../../../account/repositories/account-repository.interface';

describe('test SystemService class', () => {
  const accountRepositoryMock = mock<IAccountRepository>();

  const systemService = new SystemService(accountRepositoryMock);

  beforeEach(() => {
    mockClear(accountRepositoryMock);
  });

  describe('test reset method', () => {
    it('call reset by AccountRepository once with correct args', async () => {
      // MOCKS
      const fnFindById = accountRepositoryMock.reset.mockResolvedValue();

      // ACTUAL
      await systemService.reset();

      // EXPECT
      expect(fnFindById).toHaveBeenCalledWith();
      expect(fnFindById).toHaveBeenCalledTimes(1);
    });
  });
});
