import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaProducerService } from './services/kafka-producer.service';
import { KafkaConsumerService } from './services/kafka-consumer.service';
import { logLevel } from 'kafkajs';
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
            logLevel: logLevel.DEBUG,
            logCreator: logLevel => logLevel => {
              return {
                log: (log: any) => {
                  console.log(log);
                }
              };
            },
            retry: {
              initialRetryTime: 1000,
              retries: 5,
            },
            connectionTimeout: 3000,
          },
          consumer: {
            groupId: 'nestjs-consumer-group',
            allowAutoTopicCreation: true,
            sessionTimeout: 30000,
          },
        },
      },
    ]),
  ],
  providers: [KafkaProducerService, KafkaConsumerService],
  exports: [KafkaProducerService, KafkaConsumerService],
})
export class KafkaModule { }
