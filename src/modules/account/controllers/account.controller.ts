import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Query,
  Res,
  UseFilters,
} from '@nestjs/common';
import {
  ACCOUNT_SERVICE,
  IAccountService,
} from '../services/account-service.interface';
import { EventTypeEnum } from '../enums/event-type.enum';
import { Response } from 'express';
import { EventTypeNotExistsException } from '../exceptions/event-type-not-exists.exception';
import { AccountNotFoundFilter } from '../filters/account-not-found.filter';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ACCOUNT_PRODUCER,
  IAccountProducer,
} from '../producers/account-producer.interface';

@ApiTags('Account')
@UseFilters(new AccountNotFoundFilter())
@Controller()
export class AccountController {
  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly _accountService: IAccountService,
    @Inject(ACCOUNT_PRODUCER)
    private readonly _accountProducer: IAccountProducer,
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
    switch (request.type) {
      case EventTypeEnum.Deposit:
        await this._accountProducer.deposit(
          request.destination,
          request.amount,
        );
        return res.status(HttpStatus.CREATED).send(request);

      case EventTypeEnum.Withdraw:
        await this._accountProducer.withdraw(request.origin, request.amount);
        return res.status(HttpStatus.CREATED).send(request);

      case EventTypeEnum.Transfer:
        await this._accountProducer.transfer(
          request.origin,
          request.amount,
          request.destination,
        );
        return res.status(HttpStatus.CREATED).send(request);

      default:
        throw new EventTypeNotExistsException();
    }
  }

  @ApiTags('Account')
  @ApiResponse({
    status: 200,
    description: 'return balance of account',
  })
  @ApiResponse({
    status: 404,
    description: 'account not found',
  })
  @Get('/balance')
  async getBalance(
    @Res() res: Response,
    @Query('account_id') accountId: string,
  ) {
    const response = await this._accountService.getBalanceById(accountId);
    return res.status(HttpStatus.OK).json(response);
  }
}
