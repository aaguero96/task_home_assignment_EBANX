import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Query,
  Res,
} from '@nestjs/common';
import {
  ACCOUNT_SERVICE,
  IAccountService,
} from '../../services/account-service.interface';
import { Response } from 'express';

@Controller()
export class AccountGetController {
  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly _accountService: IAccountService,
  ) {}

  @Get('/balance')
  async getBalance(
    @Res() res: Response,
    @Query('account_id') accountId: string,
  ) {
    const response = await this._accountService.getBalanceById(accountId);
    return res.status(HttpStatus.OK).json(response);
  }
}
