// kafka.module.ts

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',  // Le nom du client Kafka, utilisé pour l'injection
        transport: Transport.KAFKA,  // Définir le type de transport comme Kafka
        options: {
          client: {
            clientId: 'nestjs-kafka-client',  // L'ID de votre client Kafka
            brokers: ['localhost:9093'],  // Les adresses de vos brokers Kafka
          },
          consumer: {
            groupId: 'nestjs-consumer-group',  // Le groupe de consommateurs Kafka
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],  // Exporte ClientsModule pour qu'il soit disponible ailleurs
})
export class KafkaModule { }
