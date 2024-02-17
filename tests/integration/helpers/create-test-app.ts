import { Test, TestingModule } from '@nestjs/testing';
import { AccountControllerModule } from '../../../src/modules/account/controllers/account-controller.module';
import { DBMockModule } from './db-mock.module';
import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from '../../../src/shared/filters/http-exception.filter';
import { SystemControllerModule } from '../../../src/modules/system/controllers/system-rest.module';

export const createTestApp = async (): Promise<INestApplication> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [DBMockModule, AccountControllerModule, SystemControllerModule],
  }).compile();

  const app = module.createNestApplication();
  app.useGlobalFilters(new HttpExceptionFilter());

  return app.init();
};
