import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get('PORT') || 3000;

  // set filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // set swagger
  const configSwaggerBuilder = new DocumentBuilder()
    .setTitle('TASK HOME ASSIGNMENT EBANX')
    .setDescription('API for financial transactions')
    .setVersion('1.0')
    .addServer(
      'https://task-home-assignment-ebanx.onrender.com/',
      'Production',
    );
  configService.get('NODE_ENV') !== 'production' &&
    configSwaggerBuilder.addServer(`http://localhost:${port}/`, 'Local');
  const configSwagger = configSwaggerBuilder.build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    origin: `http://localhost:${port}/`,
    credentials: true,
  });

  // set ports
  await app.listen(port);
  console.log(`App running on port: ${port}`);
}
bootstrap();
