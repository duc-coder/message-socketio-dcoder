import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
dotenv.config();
const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //url for interaction with API request
  app.setGlobalPrefix(`api`);

  //Setup static file
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(port, async () => {
    console.log(`App listening on: ${await app.getUrl()}`);
  });
}
bootstrap();
