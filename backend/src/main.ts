import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Establece el prefijo global para todas las rutas de la API
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no definidas en el DTO
    transform: true, // Transforma los payloads a los tipos definidos en los DTOs
  })); // Habilita la validación global de DTO

  app.use(express.json()); // Habilita el parsing de JSON en las solicitudes
  app.use(express.urlencoded({ extended: true })); // Habilita el parsing de URL-encoded en las solicitudes

  // Habilitar CORS con configuracion permisiva (solo para desarrollo)
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
