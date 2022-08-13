import { Controller, Get, Req, Res } from '@nestjs/common';
import { ROUTES } from 'src/common/constants';

@Controller()
export class MessageController {
  @Get(ROUTES.CHAT_ROOM.PATH)
  async chat(@Req() req, @Res() res): Promise<any> {
    const title = 'Chat room';
    return res.render(ROUTES.CHAT_ROOM.VIEW, {
      metaData: {
        path: ROUTES.CHAT_ROOM.PATH,
      },
      title,
    });
  }
}
