import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import bodyParser from 'body-parser';

async function start() {
  const PORT = process.env.PORT || 3333;
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(bodyParser.json());

  await app.listen(PORT);
}

start();
