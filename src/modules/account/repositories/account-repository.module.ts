import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/infra/database/entities/account.entity';
import { ACCOUNT_REPOSITORY } from './account-repository.interface';
import { useClass } from 'src/shared/helpers/use-class.helper';
import { AccountRepository } from './account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [useClass(ACCOUNT_REPOSITORY, AccountRepository)],
  exports: [ACCOUNT_REPOSITORY],
})
export class AccountRepositoryModule {}
