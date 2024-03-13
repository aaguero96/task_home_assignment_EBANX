import { AccountRecordEntity } from 'src/infra/database/entities/account-records.entity';
import { IAccontRecordRepository } from './account-record-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, Repository } from 'typeorm';

export class AccountRecordRepository implements IAccontRecordRepository {
  constructor(
    @InjectRepository(AccountRecordEntity)
    private readonly _accountRepo: Repository<AccountRecordEntity>,
  ) {}

  create = async (
    record: DeepPartial<AccountRecordEntity>,
    manager?: EntityManager,
  ): Promise<void> => {
    const fnExecuter = async (tem: EntityManager) => {
      const entity = tem.create(AccountRecordEntity, record);
      await tem.save(AccountRecordEntity, entity);
    };

    await (manager
      ? fnExecuter(manager)
      : fnExecuter(this._accountRepo.manager));
  };

  accountSummary = async (
    accountId: string,
  ): Promise<AccountRecordEntity[]> => {
    return this._accountRepo.find({
      where: [
        { originAccount: { id: accountId } },
        { destinationAccount: { id: accountId } },
      ],
      relations: ['originAccount', 'destinationAccount'],
    });
  };
}
