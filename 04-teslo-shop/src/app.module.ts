import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),

    ProductsModule,

    CommonModule,

    SeedModule,

    FilesModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      }),

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
