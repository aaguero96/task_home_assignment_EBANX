import { Module } from '@nestjs/common';
import { AccountServiceModule } from '../services/account-service.module';
import { AccountController } from './account.controller';
import { UserServiceModule } from 'src/modules/user/services/user-service.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AccountServiceModule, UserServiceModule, JwtModule],
  controllers: [AccountController],
})
export class AccountControllerModule {}
