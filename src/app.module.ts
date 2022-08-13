import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
const { ServeStaticModule } = require('@nestjs/serve-static');
const { join } = require('path');

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    //   exclude: ['api*'],
    // }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
