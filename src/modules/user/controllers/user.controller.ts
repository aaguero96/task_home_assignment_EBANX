import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { IUserService, USER_SERVICE } from '../services/user-service.interface';
import { DataSource } from 'typeorm';
import { Response } from 'express';
import { LoginRequestDTO } from '../dtos/login-request.dto';

@Controller('/user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly _userService: IUserService,
    private readonly _dataSource: DataSource,
  ) {}

  @Post()
  async create(@Res() res: Response, @Body() request: any) {
    const querryRunner = this._dataSource.createQueryRunner();
    await querryRunner.connect();
    await querryRunner.startTransaction();

    try {
      const response = await this._userService.create(
        request,
        querryRunner.manager,
      );
      await querryRunner.commitTransaction();
      return res.status(HttpStatus.CREATED).send(response);
    } catch (e) {
      await querryRunner.rollbackTransaction();
      throw e;
    } finally {
      await querryRunner.release();
    }
  }

  @Post('/login')
  async login(@Res() res: Response, @Body() request: LoginRequestDTO) {
    const response = await this._userService.login(
      request.username,
      request.password,
    );
    return res.status(HttpStatus.OK).send(response);
  }
}
