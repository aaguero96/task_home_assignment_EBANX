import { Module } from '@nestjs/common';
import { useClass } from 'src/shared/helpers/use-class.helper';
import { USER_DOMAIN } from './user-domain.interface';
import { UserDomain } from './user.domain';

@Module({
  providers: [useClass(USER_DOMAIN, UserDomain)],
  exports: [USER_DOMAIN],
})
export class UserDomainModule {}
