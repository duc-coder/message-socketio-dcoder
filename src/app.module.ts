import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatListModule } from './message/chatList.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [MessageModule, ChatListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
