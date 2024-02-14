import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          logger: null,
          url: configService.get('DATABASE_URL'),
          entities: [join(__dirname, './entities/**/*.entity{.js,.ts}')],
          migrations: [join(__dirname, './migrations/**/*{.js,.ts}')],
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
})
export class DBModule {}
