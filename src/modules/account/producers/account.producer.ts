import { Injectable } from '@nestjs/common';
import { IAccountProducer } from './account-producer.interface';
import { EventTypeEnum } from '../enums/event-type.enum';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AccountProducer implements IAccountProducer {
  constructor(
    @InjectQueue('ACCOUNT_QUEUE') private readonly _accountQueue: Queue,
  ) {}

  deposit = async (destination: string, amount: number): Promise<void> => {
    const data = {
      destination,
      amount,
    };
    await this._accountQueue.add(EventTypeEnum.Deposit, data);
  };

  withdraw = async (origin: string, amount: number): Promise<void> => {
    const data = {
      origin,
      amount,
    };
    await this._accountQueue.add(EventTypeEnum.Withdraw, data);
  };

  transfer = async (
    origin: string,
    amount: number,
    destination: string,
  ): Promise<void> => {
    const data = {
      origin,
      amount,
      destination,
    };
    await this._accountQueue.add(EventTypeEnum.Transfer, data);
  };
}
