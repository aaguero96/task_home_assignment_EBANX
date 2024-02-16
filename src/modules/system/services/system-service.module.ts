import { Module } from '@nestjs/common';
import { AccountRepositoryModule } from '../../../modules/account/repositories/account-repository.module';
import { useClass } from '../../../shared/helpers/use-class.helper';
import { SYSTEM_SERVICE } from './system-service.interface';
import { SystemService } from './system.service';

@Module({
  imports: [AccountRepositoryModule],
  providers: [useClass(SYSTEM_SERVICE, SystemService)],
  exports: [SYSTEM_SERVICE],
})
export class SystemServiceModule {}
