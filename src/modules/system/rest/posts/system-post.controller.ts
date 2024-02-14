import { Controller, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import {
  ISystemService,
  SYSTEM_SERVICE,
} from '../../services/system-service.interface';
import { Response } from 'express';

@Controller()
export class SystemPostController {
  constructor(
    @Inject(SYSTEM_SERVICE) private readonly _systemService: ISystemService,
  ) {}

  @Post('/reset')
  async reset(@Res() res: Response) {
    await this._systemService.reset();
    return res.status(HttpStatus.OK).end();
  }
}
