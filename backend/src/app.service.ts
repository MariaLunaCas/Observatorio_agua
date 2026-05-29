import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ConnectionStates } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectConnection() private connection: Connection) {}

  getHello(): string {
    return 'Hello World!';
  }

  onModuleInit() {
    const isConnected =
      this.connection.readyState === ConnectionStates.connected;
    console.log(
      `MongoDB connection status: ${isConnected ? 'Connected' : 'Not Connected'}`,
    );
  }
}
