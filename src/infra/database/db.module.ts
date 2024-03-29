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
          logging: configService.get('LOGGING_TYPEORM') == 'true',
          host: configService.get('DATABASE_HOST'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_NAME'),
          ssl: configService.get('DATABASE_SSL') == 'true',
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
