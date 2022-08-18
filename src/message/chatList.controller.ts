import { Controller, Get, Req, Res } from '@nestjs/common';
import { ROUTES } from 'src/common/constants';

@Controller()
export class ChatListController {
  @Get(ROUTES.CHAT.CHAT_ROOM_LIST.PATH)
  async chat(@Req() req, @Res() res): Promise<any> {
    const title = 'Chat list';
    const chatRoomPath = ROUTES.CHAT.CHAT_ROOM.PATH;
    return res.render(ROUTES.CHAT.CHAT_ROOM_LIST.VIEW, {
      metaData: {
        path: ROUTES.CHAT.CHAT_ROOM_LIST.PATH,
      },
      title,
      chatRoomPath,
    });
  }
}
