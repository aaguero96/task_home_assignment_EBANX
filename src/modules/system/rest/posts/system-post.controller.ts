import { Controller, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import {
  ISystemService,
  SYSTEM_SERVICE,
} from '../../services/system-service.interface';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('System')
@ApiResponse({
  status: 200,
  description: 'clear account table',
})
@Controller()
export class SystemPostController {
  constructor(
    @Inject(SYSTEM_SERVICE) private readonly _systemService: ISystemService,
  ) {}

  @Post('/reset')
  async reset(@Res() res: Response) {
    await this._systemService.reset();
    return res.status(HttpStatus.OK).send('OK');
  }
}
