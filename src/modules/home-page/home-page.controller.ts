import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';

@Controller()
@ApiExcludeController()
export class HomePageController {
  @Get()
  homePage(@Res() res: Response) {
    res.sendFile('home-page.html', { root: __dirname.replace('/dist', '') });
  }
}
