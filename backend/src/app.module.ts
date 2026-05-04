import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configurationMongo } from './configuration/configuration-mongo'; // Asegúrate de que la ruta sea correcta
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationMongo], // Cargando configuración de MongoDB
      envFilePath: `.env`, // Carga el archivo .env
      isGlobal: true, // Las variables de entorno están disponibles globalmente
      
    }),
    // Configuración de Mongoose para conectarse a MongoDB usando la URI desde las variables de entorno
    //utilizando el metodo de mongooseModule.forRootAsync de manera asincrona para obtener la URI de MongoDB desde el ConfigService
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const mongodbUri = configService.get<string>('mongo.MONGODB_URI');
        return {
          uri: mongodbUri,
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    ReportsModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
