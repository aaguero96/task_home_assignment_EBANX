import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DBModule } from './infra/database/db.module';
import { AccountControllerModule } from './modules/account/controllers/account-controller.module';
import { SystemControllerModule } from './modules/system/controllers/system-rest.module';
import { HomePageController } from './modules/home-page/home-page.controller';
import { LoggerModule } from 'nestjs-pino';
import { ScheduleModule } from '@nestjs/schedule';
import { AccountConsumerModule } from './modules/account/consumers/account-consumer.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
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
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
          },
        };
      },
    }),
    DBModule,
    AccountControllerModule,
    AccountConsumerModule,
    SystemControllerModule,
  ],
  controllers: [HomePageController],
})
export class AppModule {}
