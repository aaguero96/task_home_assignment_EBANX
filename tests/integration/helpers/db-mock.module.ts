import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../../../src/infra/database/entities/account.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory',
      entities: [AccountEntity],
      synchronize: true,
    }),
  ],
})
export class DBMockModule {}
