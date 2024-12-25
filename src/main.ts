import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Utilisation du pipe de validation global
  app.useGlobalPipes(new ValidationPipe());

  // Configuration de CORS pour autoriser toutes les origines
  app.enableCors({
    origin: '*', // Autorise toutes les origines
  });

  // Démarre l'application sur le port 3000 et écoute sur toutes les interfaces réseau
  await app.listen(3000, '0.0.0.0');

  // Message de confirmation que le serveur est bien en cours d'exécution
  console.log('NestJS application is running on http://localhost:3000');
}

bootstrap();
