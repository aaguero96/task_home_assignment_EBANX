import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../repositories/user-repository.module';
import { UserDomainModule } from '../domains/user-domain.module';
import { useClass } from 'src/shared/helpers/use-class.helper';
import { USER_SERVICE } from './user-service.interface';
import { UserService } from './user.service';
import { AccountRepositoryModule } from 'src/modules/account/repositories/account-repository.module';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_SERVICE } from './auth-service.interface';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserRepositoryModule,
    UserDomainModule,
    AccountRepositoryModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
        };
      },
    }),
  ],
  providers: [
    useClass(USER_SERVICE, UserService),
    useClass(AUTH_SERVICE, AuthService),
  ],
  exports: [USER_SERVICE, AUTH_SERVICE],
})
export class UserServiceModule {}
