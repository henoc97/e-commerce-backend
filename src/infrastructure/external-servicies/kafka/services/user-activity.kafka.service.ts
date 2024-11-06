// import { Injectable, Inject } from '@nestjs/common';
// import { ClientKafka } from '@nestjs/microservices';

// @Injectable()
// export class InteractionService {
//     constructor(
//         @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,  // Inject Kafka service from the NestJS ecosystem
  
//     ) {}


//   async publishInteraction(interactionData) {
//     this.kafkaService.emit('interactions', JSON.stringify(interactionData));
//   }

//   async publishProductUpdate(productData) {
//     this.kafkaService.emit('product', JSON.stringify(productData));
//   }
// }
