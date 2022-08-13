import { Module } from '@nestjs/common';
import { EventsModule } from 'src/events/events.module';
import { MessageController } from './message.controller';

@Module({
  imports: [EventsModule],
  controllers: [MessageController],
})
export class MessageModule {}
