import { Module } from '@nestjs/common';
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionRepository } from 'src/infrastructure/persistences/subscription.repository.impl';
import { CountSubscriptionsByVendor } from '../use-cases/subscription.use-cases/count-subscriptions-by-vendor.use-case';
import { CreateSubscription } from '../use-cases/subscription.use-cases/create-subscription.use-case';
import { DeleteSubscription } from '../use-cases/subscription.use-cases/delete-subscription.use-case';
import { ListExpiredSubscriptions } from '../use-cases/subscription.use-cases/list-expired-subscriptions.use-case';
import { FetchSubscriptionById } from '../use-cases/subscription.use-cases/fetch-subscription-by-id.use-case';
import { FetchLatestSubscription } from '../use-cases/subscription.use-cases/fetch-latest-subscription.use-case';
import { ListSubscriptionsByVendor } from '../use-cases/subscription.use-cases/list-subscriptions-by-vendor.use-case';
import { ListExpiringSubscriptions } from '../use-cases/subscription.use-cases/list-expiring-subscriptions.use-case';
import { ListSubscriptionsByPriceRange } from '../use-cases/subscription.use-cases/list-subscriptions-by-price-range.use-case';
import { UpdateSubscription } from '../use-cases/subscription.use-cases/update-subscription.use-case';
import { PrismaService } from 'prisma/prisma.service';
import { ListActiveSubscriptions } from '../use-cases/subscription.use-cases/list-active-subscriptions.use-case';

const subscriptionUseCases = [
  CreateSubscription,
  ListActiveSubscriptions,
  DeleteSubscription,
  CountSubscriptionsByVendor,
  ListExpiredSubscriptions,
  FetchSubscriptionById,
  FetchLatestSubscription,
  ListSubscriptionsByVendor,
  ListExpiringSubscriptions,
  ListSubscriptionsByPriceRange,
  UpdateSubscription,
];

@Module({
  providers: [
    SubscriptionService,
    PrismaService,
    {
      provide: 'ISubscriptionRepository',
      useClass: SubscriptionRepository,
    },
    ...subscriptionUseCases,
  ],
  exports: [SubscriptionService, ...subscriptionUseCases],
})
export class SubscriptionModule { }
