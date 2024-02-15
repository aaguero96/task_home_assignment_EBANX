import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DBModule } from './infra/database/db.module';
import { AccountRestModule } from './modules/account/rest/account-rest.module';
import { SystemRestModule } from './modules/system/rest/system-rest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DBModule,
    AccountRestModule,
    SystemRestModule,
  ],
})
export class AppModule {}
