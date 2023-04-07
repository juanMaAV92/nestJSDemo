import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // remove no required data
      forbidNonWhitelisted: true,   // error if data not required is received
    }),
  )
  await app.listen(3001);
}
main();
