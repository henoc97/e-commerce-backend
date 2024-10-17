import { Module } from '@nestjs/common';
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionRepository } from 'src/infrastructure/persistences/subscription.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    SubscriptionService,
    PrismaService,
    {
      provide: 'ISubscriptionRepository',
      useClass: SubscriptionRepository,
    },
  ],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
