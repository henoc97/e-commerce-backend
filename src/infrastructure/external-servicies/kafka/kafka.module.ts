// kafka.module.ts

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nestjs-kafka-client',
            brokers: ['localhost:9092'],
            retry: {
              initialRetryTime: 1000,
              retries: 5
            },
            connectionTimeout: 3000
          },
          consumer: {
            groupId: 'nestjs-consumer-group',
            allowAutoTopicCreation: true,
            sessionTimeout: 30000
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule { }
