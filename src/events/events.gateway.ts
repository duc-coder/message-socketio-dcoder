import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

let count = 0;

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('connection')
  newUser(@MessageBody() data: any, @ConnectedSocket() socket: Socket): string {
    console.log('New user connected!');
    socket.broadcast.emit('newUser');
    return (data = 'Hi new user!');
  }

  @SubscribeMessage('increaseNum')
  setIncreNum(@MessageBody() data: any): void {
    count += 1;
    console.log(`'Increase count' ${count}`);
    this.server.emit('msgToClient', count);
  }

  @SubscribeMessage('decreaseNum')
  setDecreNum(@MessageBody() data: any): void {
    count -= 1;
    console.log(`'Decrease count' ${count}`);
    this.server.emit('msgToClient', count);
  }

  @SubscribeMessage('newMessage')
  newMessage(
    @MessageBody() data: any,
    @ConnectedSocket() socket: Socket,
  ): string {
    console.log(data);
    data = { ...data, createAt: Date.now() };
    this.server.emit('messageToClient', data);
    const res = 'The message has been sent';
    return res;
  }
}
