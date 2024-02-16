import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../helpers/create-test-app';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AccountEntity } from '../../../src/infra/database/entities/account.entity';

describe('POST /reset', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeEach(async () => {
    app = await createTestApp();
    dataSource = app.get(DataSource);
    await dataSource.manager.clear(AccountEntity);
  });

  afterEach(async () => {
    await dataSource.destroy();
    await app.close();
  });

  it('status 200 and send OK', async () => {
    await dataSource.manager.save(AccountEntity, { id: '1', balance: 100 });
    return request(app.getHttpServer()).post(`/reset`).expect(200).expect('OK');
  });
});
