import { Test, TestingModule } from '@nestjs/testing';
import { AccountRestModule } from '../../../src/modules/account/rest/account-rest.module';
import { DBMockModule } from './db-mock.module';
import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from '../../../src/shared/filters/http-exception.filter';
import { SystemRestModule } from '../../../src/modules/system/rest/system-rest.module';

export const createTestApp = async (): Promise<INestApplication> => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [DBMockModule, AccountRestModule, SystemRestModule],
  }).compile();

  const app = module.createNestApplication();
  app.useGlobalFilters(new HttpExceptionFilter());

  return app.init();
};
