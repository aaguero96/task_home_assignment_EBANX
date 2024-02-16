import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  console.log(`App running on port: ${port}`);
}
bootstrap();
