import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('🚀 ~ handleConnection ~ client:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('🚀 ~ handleDisconnect ~ client:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string) {
    this.server.emit('messageServer', `Text received: ${message}`);
  }
}
