import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomePageController {
  @Get()
  homePage() {
    return 'Hello World';
  }
}
