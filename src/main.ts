import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './core/infra/interceptors/response.interceptor';
import { LoggingInterceptor } from './core/infra/interceptors/logger.interceptor';
import { LoggerService } from './core/infra/logger/logger.service';
import { AllExceptionFilter } from './core/infra/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();

  // // Filters
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // // Interceptors
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Interview Challenge API')
    .setDescription('Sample interview application')
    .setVersion('1.0')
    .addTag('Interview Challenge')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  if (!process.env.APP_PORT) {
    throw new Error('APP_PORT is not defined in .env file');
  }

  await app.listen(process.env.APP_PORT);
}
bootstrap();
