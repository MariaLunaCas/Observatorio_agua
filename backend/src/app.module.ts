import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configurationMongo } from './configuration/configuration-mongo'; // Correcto

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationMongo], // Cargando configuración de MongoDB
      envFilePath: `.env`,        // Carga el archivo .env
      isGlobal: true,             // Las variables de entorno están disponibles globalmente
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        // Agregar el console.log aquí para verificar la URI de MongoDB
        console.log('MONGODB_URI:', configService.get<string>('mongo.MONGODB_URI'));

        return {
          uri: configService.get<string>('mongo.MONGODB_URI'), // Asegúrate de que se obtiene correctamente la URI
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}