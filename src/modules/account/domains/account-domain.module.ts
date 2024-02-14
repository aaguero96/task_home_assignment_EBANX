import { Module } from '@nestjs/common';
import { useClass } from 'src/shared/helpers/use-class.helper';
import { ACCOUNT_DOMAIN } from './account-domain.interface';
import { AccountDomain } from './account.domain';

@Module({
  providers: [useClass(ACCOUNT_DOMAIN, AccountDomain)],
  exports: [ACCOUNT_DOMAIN],
})
export class AccountDomainModule {}
