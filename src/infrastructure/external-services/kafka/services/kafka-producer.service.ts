import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
    constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) { }

    private kafkaTopics: string[] = [
        "user.created", "user.updated",
        "product.created", "product.updated",
        "order-item.created", "order-item.updated",
        "order.created", "order.updated",
    ]
    async onModuleInit() {
        // S'assurer que le topic est enregistré (optionnel si `allowAutoTopicCreation` est true)
        // this.kafkaClient.subscribeToResponseOf('user.created');
        // this.kafkaTopics.map(this.kafkaClient.subscribeToResponseOf)
        await this.kafkaClient.connect();
    }

    async emitEvent(topic: string, data: string) {
        this.kafkaTopics.includes(topic)
            ? this.kafkaClient.emit(topic, data)
            : console.log("topic doesn't exist");
    }
}
