import { Injectable, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class KafkaConsumerService implements OnModuleDestroy {
    async onModuleDestroy() {
        // Gestion de la déconnexion (nettoyage éventuel)
        console.log('Consumer destroyed');
    }

    handleUserCreatedEvent(payload: any) {
        console.log('Received user.created event:', payload);
        // Logique métier pour traiter l'événement
    }
}
