import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import {
  ACCOUNT_SERVICE,
  IAccountService,
} from '../../services/account-service.interface';
import { EventTypeEnum } from '../../enums/event-type.enum';
import { Response } from 'express';
import { EventTypeNotExistsException } from '../../exceptions/event-type-not-exists.exception';
import { AccountNotFoundFilter } from '../../filters/account-not-found.filter';
import { DataSource } from 'typeorm';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Account')
@Controller()
export class AccountPostController {
  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly _accountService: IAccountService,
    private readonly _dataSource: DataSource,
  ) {}

  @ApiBody({
    description:
      'look at examples bellow this to see events that are possible in this endpoint',
    examples: {
      deposit: {
        value: { type: 'deposit', destination: 'account_id', amount: 0 },
      },
      withdraw: {
        value: { type: 'withdraw', origin: 'account_id', amount: 0 },
      },
      transfer: {
        value: {
          type: 'transfer',
          origin: 'account_id',
          amount: 0,
          destination: 'account_id',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'deposit, withdraw or transfer done',
  })
  @ApiResponse({ status: 400, description: 'type not exists' })
  @ApiResponse({
    status: 404,
    description: 'not fount origin account for withdraw or transfer',
  })
  @Post('/event')
  @UseFilters(new AccountNotFoundFilter())
  async event(@Res() res: Response, @Body() request: any) {
    const querryRunner = this._dataSource.createQueryRunner();
    await querryRunner.connect();
    await querryRunner.startTransaction();

    try {
      let response: any;
      switch (request.type) {
        case EventTypeEnum.Deposit:
          response = await this._accountService.deposit(
            request.destination,
            request.amount,
            querryRunner.manager,
          );
          await querryRunner.commitTransaction();
          return res.status(HttpStatus.CREATED).send(response);

        case EventTypeEnum.Withdraw:
          response = await this._accountService.withdraw(
            request.origin,
            request.amount,
          );
          return res.status(HttpStatus.CREATED).send(response);

        case EventTypeEnum.Transfer:
          response = await this._accountService.transfer(
            request.origin,
            request.amount,
            request.destination,
            querryRunner.manager,
          );
          await querryRunner.commitTransaction();
          return res.status(HttpStatus.CREATED).send(response);

        default:
          throw new EventTypeNotExistsException();
      }
    } catch (e) {
      await querryRunner.rollbackTransaction();
      throw e;
    } finally {
      await querryRunner.release();
    }
  }
}
