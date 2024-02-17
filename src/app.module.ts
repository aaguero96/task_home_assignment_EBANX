import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DBModule } from './infra/database/db.module';
import { AccountControllerModule } from './modules/account/controllers/account-controller.module';
import { SystemControllerModule } from './modules/system/controllers/system-rest.module';
import { HomePageController } from './modules/home-page/home-page.controller';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          pinoHttp: {
            level:
              configService.get('NODE_ENV') !== 'production' ? 'debug' : 'info',
            transport: {
              target: 'pino-pretty',
              options: {
                singleLine: true,
                colorize: true,
              },
            },
          },
        };
      },
    }),
    DBModule,
    AccountControllerModule,
    SystemControllerModule,
  ],
  controllers: [HomePageController],
})
export class AppModule {}
