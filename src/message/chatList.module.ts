import { Module } from '@nestjs/common';
import { EventsModule } from 'src/events/events.module';
import { ChatListController } from './chatList.controller';

@Module({
  imports: [EventsModule],
  controllers: [ChatListController],
})
export class ChatListModule {}
