import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../helpers/create-test-app';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AccountEntity } from '../../../src/infra/database/entities/account.entity';

describe('GET /balance', () => {
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

  it('status 200 if account exists', async () => {
    await dataSource.manager.save(AccountEntity, { id: '1', balance: 100 });
    return request(app.getHttpServer())
      .get(`/balance`)
      .query({ account_id: '1' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toStrictEqual(100);
      });
  });

  it('status 404 if account doesnt exists', async () => {
    return request(app.getHttpServer())
      .get(`/balance`)
      .query({ account_id: '1' })
      .expect(404)
      .expect((res) => {
        expect(res.body).toStrictEqual(0);
      });
  });
});
