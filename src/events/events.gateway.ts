import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

let count: number = 0;

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('connection')
  newUser(@MessageBody() data: any): string {
    console.log('New user connected!');
    data = 'Hi new user!';
    return data;
  }

  @SubscribeMessage('disconnection')
  userDisconnect(@MessageBody() data: any): void {
    console.log('User left!');
  }

  @SubscribeMessage('increaseNum')
  setIncreNum(@MessageBody() data: any): void {
    count += 1;
    this.server.emit('msgToClient', count);
  }

  @SubscribeMessage('decreaseNum')
  setDecreNum(@MessageBody() data: any): void {
    count -= 1;
    this.server.emit('msgToClient', count);
  }
}
