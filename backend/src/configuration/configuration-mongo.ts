import { registerAs } from '@nestjs/config';

export const configurationMongo = registerAs('mongo', () => ({
  MONGODB_URI: process.env.MONGODB_URI,
}));
