import { Module } from '@nestjs/common';
import { AccountRepositoryModule } from '../repositories/account-repository.module';
import { useClass } from '../../../shared/helpers/use-class.helper';
import { ACCOUNT_SERVICE } from './account-service.interface';
import { AccountService } from './account.service';
import { AccountDomainModule } from '../domains/account-domain.module';

@Module({
  imports: [AccountRepositoryModule, AccountDomainModule],
  providers: [useClass(ACCOUNT_SERVICE, AccountService)],
  exports: [ACCOUNT_SERVICE],
})
export class AccountServiceModule {}
