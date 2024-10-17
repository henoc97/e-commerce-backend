import { Module } from '@nestjs/common';
import { NewsletterSubscriptionService } from '../services/newsletter-subscription.service';
import { PrismaService } from 'prisma/prisma.service';
import { NewsletterSubscriptionRepository } from 'src/infrastructure/persistences/newsletter-subscription.repository.impl';

@Module({
  providers: [
    NewsletterSubscriptionService,
    PrismaService,
    {
      provide: 'INewsletterSubscriptionRepository',
      useClass: NewsletterSubscriptionRepository,
    },
  ],
  exports: [NewsletterSubscriptionService],
})
export class NewsletterSubscriptionModule {}
