import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Query,
  Res,
  UseFilters,
} from '@nestjs/common';
import {
  ACCOUNT_SERVICE,
  IAccountService,
} from '../../services/account-service.interface';
import { Response } from 'express';
import { AccountNotFoundFilter } from '../../filters/account-not-found.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Account')
@ApiResponse({
  status: 200,
  description: 'return balance of account',
})
@ApiResponse({
  status: 404,
  description: 'account not found',
})
@Controller()
@UseFilters(new AccountNotFoundFilter())
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
