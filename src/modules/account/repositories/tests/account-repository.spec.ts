import { AccountEntity } from '../../../../infra/database/entities/account.entity';
import { AccountRepository } from '../account.repository';

describe('test AccountRepository class', () => {
  const accountDbMock: any = {
    manager: {
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      findOne: jest.fn(),
      clear: jest.fn(),
    },
  };

  const accountRepository = new AccountRepository(accountDbMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('test create method', () => {
    it('call create by database once with correct args', async () => {
      // MOCKS
      const managerMock: any = {
        create: jest.fn().mockReturnValue({ id: '1', balance: 100 }),
        save: jest.fn(),
      };

      // ACTUAL
      await accountRepository.create({ id: '1', balance: 100 }, managerMock);

      // EXPECT
      expect(managerMock.create).toHaveBeenCalledTimes(1);
      expect(managerMock.create).toHaveBeenCalledWith(AccountEntity, {
        id: '1',
        balance: 100,
      });
    });

    it('call save by database once with correct args', async () => {
      // MOCKS
      const managerMock: any = {
        create: jest.fn().mockReturnValue({ id: '1', balance: 100 }),
        save: jest.fn().mockResolvedValue({ id: '1', balance: 100 }),
      };

      // ACTUAL
      await accountRepository.create({ id: '1', balance: 100 }, managerMock);

      // EXPECT
      expect(managerMock.save).toHaveBeenCalledTimes(1);
      expect(managerMock.save).toHaveBeenCalledWith(AccountEntity, {
        id: '1',
        balance: 100,
      });
    });

    it('return created account', async () => {
      // MOCKS
      const managerMock: any = {
        create: jest.fn().mockReturnValue({ id: '1', balance: 100 }),
        save: jest.fn().mockResolvedValue({ id: '1', balance: 100 }),
      };

      // ACTUAL
      const actual = await accountRepository.create(
        { id: '1', balance: 100 },
        managerMock,
      );

      // EXPECT
      expect(actual).toStrictEqual({ id: '1', balance: 100 });
    });

    it('return created account without transactions', async () => {
      // MOCKS
      accountDbMock.manager.create.mockReturnValue({ id: '1', balance: 100 });
      accountDbMock.manager.save.mockResolvedValue({ id: '1', balance: 100 });

      // ACTUAL
      const actual = await accountRepository.create(
        { id: '1', balance: 100 },
        undefined,
      );

      // EXPECT
      expect(actual).toStrictEqual({ id: '1', balance: 100 });
    });
  });

  describe('test updateBalanceById method', () => {
    it('call create by database once with correct args', async () => {
      // MOCKS
      const managerMock: any = {
        create: jest.fn().mockReturnValue({ id: '1', balance: 100 }),
        update: jest.fn(),
      };

      // ACTUAL
      await accountRepository.updateBalanceById('1', 100, managerMock);

      // EXPECT
      expect(managerMock.create).toHaveBeenCalledTimes(1);
      expect(managerMock.create).toHaveBeenCalledWith(AccountEntity, {
        id: '1',
        balance: 100,
      });
    });

    it('call update by database once with correct args', async () => {
      // MOCKS
      const managerMock: any = {
        create: jest.fn().mockReturnValue({ id: '1', balance: 100 }),
        update: jest.fn().mockResolvedValue({ id: '1', balance: 100 }),
      };

      // ACTUAL
      await accountRepository.updateBalanceById('1', 100, managerMock);

      // EXPECT
      expect(managerMock.update).toHaveBeenCalledTimes(1);
      expect(managerMock.update).toHaveBeenCalledWith(
        AccountEntity,
        { id: '1' },
        {
          id: '1',
          balance: 100,
        },
      );
    });

    it('return updated account', async () => {
      // MOCKS
      const managerMock: any = {
        create: jest.fn().mockReturnValue({ id: '1', balance: 100 }),
        update: jest.fn().mockResolvedValue({ id: '1', balance: 100 }),
      };

      // ACTUAL
      const actual = await accountRepository.updateBalanceById(
        '1',
        100,
        managerMock,
      );

      // EXPECT
      expect(actual).toStrictEqual({ id: '1', balance: 100 });
    });

    it('return updated account without transaction', async () => {
      // MOCKS
      accountDbMock.manager.create.mockReturnValue({ id: '1', balance: 100 });
      accountDbMock.manager.update.mockResolvedValue({ id: '1', balance: 100 });

      // ACTUAL
      const actual = await accountRepository.updateBalanceById(
        '1',
        100,
        undefined,
      );

      // EXPECT
      expect(actual).toStrictEqual({ id: '1', balance: 100 });
    });
  });

  describe('test findById method', () => {
    it('call findOne by database once with correct args', async () => {
      // MOCKS
      const managerMock: any = {
        findOne: jest.fn().mockResolvedValueOnce({ id: '1', balance: 100 }),
      };

      // ACTUAL
      await accountRepository.findById('1', managerMock);

      // EXPECT
      expect(managerMock.findOne).toHaveBeenCalledTimes(1);
      expect(managerMock.findOne).toHaveBeenCalledWith(AccountEntity, {
        where: { id: '1' },
      });
    });

    it('return account', async () => {
      // MOCKS
      const managerMock: any = {
        findOne: jest.fn().mockResolvedValueOnce({ id: '1', balance: 100 }),
      };

      // ACTUAL
      const actual = await accountRepository.findById('1', managerMock);

      // EXPECT
      expect(actual).toStrictEqual({ id: '1', balance: 100 });
    });

    it('return account withour transaction', async () => {
      // MOCKS
      accountDbMock.manager.findOne.mockResolvedValueOnce({
        id: '1',
        balance: 100,
      });

      // ACTUAL
      const actual = await accountRepository.findById('1', undefined);

      // EXPECT
      expect(actual).toStrictEqual({ id: '1', balance: 100 });
    });
  });

  describe('test reset method', () => {
    it('call clear by database once with correct args', async () => {
      // MOCKS
      const managerMock: any = {
        clear: jest.fn(),
      };

      // ACTUAL
      await accountRepository.reset(managerMock);

      // EXPECT
      expect(managerMock.clear).toHaveBeenCalledTimes(1);
      expect(managerMock.clear).toHaveBeenCalledWith(AccountEntity);
    });

    it('return void', async () => {
      // MOCKS
      const managerMock: any = {
        clear: jest.fn(),
      };

      // ACTUAL
      const actual = await accountRepository.reset(managerMock);

      // EXPECT
      expect(actual).toBeUndefined();
    });

    it('return void without transaction', async () => {
      // MOCKS
      accountDbMock.manager.clear.mockResolvedValue();

      // ACTUAL
      const actual = await accountRepository.reset(undefined);

      // EXPECT
      expect(actual).toBeUndefined();
    });
  });
});
