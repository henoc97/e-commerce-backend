import { Injectable } from '@nestjs/common';
import { NewsletterSubscriptionService } from '../../../application/services/newsletter-subscription.service';

/**
 * Use case class to count the total number of newsletter subscriptions.
 */
@Injectable()
export class CountTotalNewsletterSubscriptions {
  constructor(private readonly service: NewsletterSubscriptionService) { }

  /**
   * Execute the use case to count total subscriptions.
   * @param shopId - The ID of the shop to count the subscriptions for.
   * @returns The total number of subscriptions.
   */
  async execute(shopId: number): Promise<number> {
    return await this.service.countTotalSubscriptions(shopId);
  }
}
