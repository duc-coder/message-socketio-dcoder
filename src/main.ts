import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
import * as nunjucks from 'nunjucks';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ROUTES } from './common/constants';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //Setup static file
  app.useStaticAssets(join(__dirname, '..', 'public'));

  //Setup view engine
  nunjucks
    .configure('views', {
      autoescape: true,
      express: app,
      watch: true,
    })
    .addGlobal('ROUTES', ROUTES);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('html');

  await app.listen(port, async () => {
    console.log(`App listening on: ${await app.getUrl()}`);
  });
}
bootstrap();
