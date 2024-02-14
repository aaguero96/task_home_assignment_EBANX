import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import {
  ACCOUNT_SERVICE,
  IAccountService,
} from '../../services/account-service.interface';
import { EventTypeEnum } from '../../enums/event-type.enum';
import { Response } from 'express';
import { EventTypeNotExistsException } from '../../exceptions/event-type-not-exists.exception';

@Controller()
export class AccountPostController {
  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly _accountService: IAccountService,
  ) {}

  @Post('/event')
  async event(@Res() res: Response, @Body() request: any) {
    let response: any;
    switch (request.type) {
      case EventTypeEnum.Deposit:
        response = await this._accountService.deposit(
          request.destination,
          request.amount,
        );
        return res.status(HttpStatus.CREATED).json(response);

      case EventTypeEnum.Withdraw:
        response = await this._accountService.withdraw(
          request.origin,
          request.amount,
        );
        return res.status(HttpStatus.CREATED).json(response);

      case EventTypeEnum.Transfer:
        response = await this._accountService.transfer(
          request.origin,
          request.amount,
          request.destination,
        );
        return res.status(HttpStatus.CREATED).json(response);

      default:
        throw new EventTypeNotExistsException();
    }
  }
}
