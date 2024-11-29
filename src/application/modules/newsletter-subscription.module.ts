import { Module } from '@nestjs/common';
import { NewsletterSubscriptionService } from '../services/newsletter-subscription.service';
import { NewsletterSubscriptionRepository } from 'src/infrastructure/persistences/newsletter-subscription.repository.impl';
import { ListNewsletterSubscriptions } from '../use-cases/newsletter-subscription.use-cases/list-newsletter-subscriptions.use-case';
import { CreateNewsletterSubscription } from '../use-cases/newsletter-subscription.use-cases/create-newsletter-subscription.use-case';
import { UpdateNewsletterSubscription } from '../use-cases/newsletter-subscription.use-cases/update-newsletter-subscription.use-case';
import { FetchNewsletterSubscriptionByEmail } from '../use-cases/newsletter-subscription.use-cases/fetch-newsletter-subscription-by-email.use-case';
import { DeleteNewsletterSubscription } from '../use-cases/newsletter-subscription.use-cases/delete-newsletter-subscription.use-case';
import { CheckEmailSubscribed } from '../use-cases/newsletter-subscription.use-cases/check-email-subscribed.use-case';
import { FetchNewsletterSubscriptionById } from '../use-cases/newsletter-subscription.use-cases/fetch-newsletter-subscription-by-id.use-case';
import { CountTotalNewsletterSubscriptions } from '../use-cases/newsletter-subscription.use-cases/count-total-newsletter-subscriptions.use-case';
import { FetchNewsletterSubscriptionsByDateRange } from '../use-cases/newsletter-subscription.use-cases/fetch-newsletter-subscriptions-by-date-range.use-case';

const newsletterSubscriptionUseCases = [
  ListNewsletterSubscriptions,
  CreateNewsletterSubscription,
  UpdateNewsletterSubscription,
  FetchNewsletterSubscriptionByEmail,
  DeleteNewsletterSubscription,
  CheckEmailSubscribed,
  FetchNewsletterSubscriptionById,
  CountTotalNewsletterSubscriptions,
  FetchNewsletterSubscriptionsByDateRange,
];

@Module({
  providers: [
    NewsletterSubscriptionService,

    {
      provide: 'INewsletterSubscriptionRepository',
      useClass: NewsletterSubscriptionRepository,
    },
    ...newsletterSubscriptionUseCases,
  ],
  exports: [NewsletterSubscriptionService, ...newsletterSubscriptionUseCases],
})
export class NewsletterSubscriptionModule { }
