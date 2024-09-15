import { Injectable } from '@nestjs/common';
import { NewsletterSubscriptionService } from 'src/application/services/newsletter-subscription.service';
import { toNewsletterSubscriptionDTO } from 'src/application/helper/to-dto/to.newsletter-subscription.dto';

/**
 * Use case class to fetch a newsletter subscription by ID.
 */
@Injectable()
export class FetchNewsletterSubscriptionById {
  constructor(private readonly service: NewsletterSubscriptionService) {}

  /**
   * Execute the use case to fetch a subscription by ID.
   * @param id - The ID of the subscription to fetch.
   * @returns The subscription data as a DTO, or null if not found.
   */
  async execute(id: number): Promise<NewsletterSubscriptionDTO | null> {
    const subscription = await this.service.getSubscriptionById(id);
    if (!subscription) return null;
    return toNewsletterSubscriptionDTO(subscription);
  }
}
