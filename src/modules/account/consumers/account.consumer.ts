import { Inject } from '@nestjs/common';
import {
  ACCOUNT_SERVICE,
  IAccountService,
} from '../services/account-service.interface';

import { IAccountConsumer } from './account-consumer.interface';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EventTypeEnum } from '../enums/event-type.enum';
import { DataSource } from 'typeorm';
import { DepositRequestDTO } from '../dtos/deposit-request.dto';
import { WithdrawRequestDTO } from '../dtos/withdraw-request.dto';
import { TransferRequestDTO } from '../dtos/transfer-request.dto';

@Processor('ACCOUNT_QUEUE')
export class AccountConsumer implements IAccountConsumer {
  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly _accountService: IAccountService,
    private readonly _dataSource: DataSource,
  ) {}

  @Process(EventTypeEnum.Deposit)
  async deposit(job: Job<DepositRequestDTO>): Promise<void> {
    const querryRunner = this._dataSource.createQueryRunner();
    await querryRunner.connect();
    await querryRunner.startTransaction();

    try {
      await this._accountService.deposit(
        job.data.destination,
        job.data.amount,
        querryRunner.manager,
      );
      await querryRunner.commitTransaction();
    } catch (e) {
      await querryRunner.rollbackTransaction();
      throw e;
    } finally {
      await querryRunner.release();
    }
  }

  @Process(EventTypeEnum.Withdraw)
  async withdraw(job: Job<WithdrawRequestDTO>): Promise<void> {
    await this._accountService.withdraw(job.data.origin, job.data.amount);
  }

  @Process(EventTypeEnum.Transfer)
  async transfer(job: Job<TransferRequestDTO>): Promise<void> {
    const querryRunner = this._dataSource.createQueryRunner();
    await querryRunner.connect();
    await querryRunner.startTransaction();

    try {
      await this._accountService.transfer(
        job.data.origin,
        job.data.amount,
        job.data.destination,
        querryRunner.manager,
      );
      await querryRunner.commitTransaction();
    } catch (e) {
      await querryRunner.rollbackTransaction();
      throw e;
    } finally {
      await querryRunner.release();
    }
  }
}
