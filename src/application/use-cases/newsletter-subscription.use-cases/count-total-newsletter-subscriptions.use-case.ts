import { Injectable } from '@nestjs/common';
import { NewsletterSubscriptionService } from 'src/application/services/newsletter-subscription.service';

/**
 * Use case class to count the total number of newsletter subscriptions.
 */
@Injectable()
export class CountTotalNewsletterSubscriptions {
  constructor(private readonly service: NewsletterSubscriptionService) {}

  /**
   * Execute the use case to count total subscriptions.
   * @returns The total number of subscriptions.
   */
  async execute(): Promise<number> {
    return await this.service.countTotalSubscriptions();
  }
}
