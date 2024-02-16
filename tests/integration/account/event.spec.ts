import { INestApplication } from '@nestjs/common';
import { createTestApp } from '../helpers/create-test-app';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AccountEntity } from '../../../src/infra/database/entities/account.entity';

describe('POST /event', () => {
  jest.useFakeTimers().setSystemTime(new Date('2024-02-15'));

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

  describe('type deposit', () => {
    it('status 201 and send destination account if account doesnt exists', async () => {
      const body = { type: 'deposit', destination: '1', amount: 100 };
      return request(app.getHttpServer())
        .post('/event')
        .send(body)
        .expect(201)
        .expect({ destination: { id: '1', balance: 100 } });
    });

    it('status 201 and send destination account if account exists', async () => {
      await dataSource.manager.save(AccountEntity, { id: '1', balance: 100 });
      const body = { type: 'deposit', destination: '1', amount: 100 };
      return request(app.getHttpServer())
        .post('/event')
        .send(body)
        .expect(201)
        .expect({ destination: { id: '1', balance: 200 } });
    });
  });

  describe('type withdraw', () => {
    it('status 404 if account doesnt exists', async () => {
      const body = { type: 'withdraw', origin: '1', amount: 50 };
      return request(app.getHttpServer())
        .post('/event')
        .send(body)
        .expect(404)
        .expect((res) => {
          expect(res.body).toStrictEqual(0);
        });
    });

    it('status 201 and send origin account if account exists', async () => {
      await dataSource.manager.save(AccountEntity, { id: '1', balance: 100 });
      const body = { type: 'withdraw', origin: '1', amount: 25 };
      return request(app.getHttpServer())
        .post('/event')
        .send(body)
        .expect(201)
        .expect({ origin: { id: '1', balance: 75 } });
    });
  });

  describe('type transfer', () => {
    it('status 404 if origin account doesnt exists', async () => {
      const body = {
        type: 'transfer',
        origin: '1',
        amount: 50,
        destination: '2',
      };
      return request(app.getHttpServer())
        .post('/event')
        .send(body)
        .expect(404)
        .expect((res) => {
          expect(res.body).toStrictEqual(0);
        });
    });

    it('status 201 if destination account exists', async () => {
      await dataSource.manager.save(AccountEntity, { id: '1', balance: 100 });
      await dataSource.manager.save(AccountEntity, { id: '2', balance: 0 });
      const body = {
        type: 'transfer',
        origin: '1',
        amount: 25,
        destination: '2',
      };
      return request(app.getHttpServer())
        .post('/event')
        .send(body)
        .expect(201)
        .expect({
          origin: { id: '1', balance: 75 },
          destination: { id: '2', balance: 25 },
        });
    });

    it('status 201 if destination account doesnt exists', async () => {
      await dataSource.manager.save(AccountEntity, { id: '1', balance: 100 });
      const body = {
        type: 'transfer',
        origin: '1',
        amount: 25,
        destination: '2',
      };
      return request(app.getHttpServer())
        .post('/event')
        .send(body)
        .expect(201)
        .expect({
          origin: { id: '1', balance: 75 },
          destination: { id: '2', balance: 25 },
        });
    });
  });

  describe('type not exists', () => {
    it('status 400', async () => {
      const body = {
        type: 'something that doesnt exist',
      };
      return request(app.getHttpServer())
        .post('/event')
        .send(body)
        .expect(400)
        .expect({
          cause: 'event type not exists',
          statusCode: 400,
          timestamp: '2024-02-15T00:00:00.000Z',
        });
    });
  });
});
