import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v3')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // Convert data in Dto
      transform: true,
      transformOptions:{
        enableImplicitConversion: true
      }
    })
  );

  await app.listen( process.env.PORT );
}

main();
