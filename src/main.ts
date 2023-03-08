import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  // app.use(compression())
  // app.use(express.json({limit: '50mb'}))
  // app.use(express.urlencoded({limit: '50mb', extended: true}))
  await app.listen(3000);
}
bootstrap();
