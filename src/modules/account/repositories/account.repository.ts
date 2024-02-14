import { InjectRepository } from '@nestjs/typeorm';
import { IAccountRepository } from './account-repository.interface';
import { AccountEntity } from 'src/infra/database/entities/account.entity';
import { EntityManager, Repository } from 'typeorm';

export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly _accountRepo: Repository<AccountEntity>,
  ) {}

  create = async (
    account: AccountEntity,
    manager?: EntityManager,
  ): Promise<AccountEntity> => {
    const fnExecuter = async (tem: EntityManager) => {
      const entity = tem.create(AccountEntity, account);
      return tem.save(AccountEntity, entity);
    };

    return manager
      ? fnExecuter(manager)
      : fnExecuter(this._accountRepo.manager);
  };

  updateBalanceById = async (
    accountId: string,
    newBalance: number,
    manager?: EntityManager,
  ): Promise<AccountEntity> => {
    const fnExecuter = async (tem: EntityManager) => {
      const entity = tem.create(AccountEntity, {
        id: accountId,
        balance: newBalance,
      });

      await tem.update(AccountEntity, { id: accountId }, entity);

      return entity;
    };

    return manager
      ? fnExecuter(manager)
      : fnExecuter(this._accountRepo.manager);
  };

  findById = async (
    accountId: string,
    manager?: EntityManager,
  ): Promise<AccountEntity> => {
    const fnExecuter = async (tem: EntityManager) => {
      return tem.findOne(AccountEntity, { where: { id: accountId } });
    };

    return manager
      ? fnExecuter(manager)
      : fnExecuter(this._accountRepo.manager);
  };

  reset = async (manager?: EntityManager): Promise<void> => {
    const fnExecuter = async (tem: EntityManager) => {
      await tem.clear(AccountEntity);
    };

    return manager
      ? fnExecuter(manager)
      : fnExecuter(this._accountRepo.manager);
  };
}
