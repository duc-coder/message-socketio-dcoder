import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('connection')
  newUser(@MessageBody() body: any, @ConnectedSocket() socket: Socket): object {
    const { userName = '', roomName = '' } = body;
    socket.join(roomName);
    socket.broadcast.to(roomName).emit('newUser', body);
    const data = {
      adminName: 'Alex Chat Bot',
      message: `Welcome ${userName} to ${roomName} Chat Room!`,
    };
    return data;
  }

  @SubscribeMessage('newMessage')
  newMessage(@MessageBody() data: any): string {
    data = { ...data, createAt: Date.now() };
    this.server.emit('messageToClient', data);
    return data;
  }
}
