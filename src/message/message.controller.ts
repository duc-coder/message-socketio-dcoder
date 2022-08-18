import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { ROUTES } from 'src/common/constants';

@Controller()
export class MessageController {
  @Get(ROUTES.CHAT.CHAT_ROOM.PATH)
  async chat(@Query() query, @Req() req, @Res() res): Promise<any> {
    const title = 'Chat room';
    const myUserName = query.name;
    const roomName = query.room;

    return res.render(ROUTES.CHAT.CHAT_ROOM.VIEW, {
      metaData: {
        path: ROUTES.CHAT.CHAT_ROOM.PATH,
      },
      title,
      myUserName,
      roomName,
    });
  }
}
