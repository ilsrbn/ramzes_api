import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: [
      'https://dashboard.ramzes.serbin.co',
      'https://ramzes.serbin.co',
      'http://localhost:4200',
    ],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
    preflightContinue: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '../..', 'public'), {
    prefix: '/public/',
  });
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Ramzes API')
    .setVersion('1')
    .addBearerAuth()
    .addServer('https://back.ramzes.serbin.co')
    .addServer('http://localhost:3005')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);
  await app.listen(3006);
}
bootstrap();
