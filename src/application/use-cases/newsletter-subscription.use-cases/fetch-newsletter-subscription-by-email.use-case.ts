import { Injectable } from '@nestjs/common';
import { NewsletterSubscriptionService } from 'src/application/services/newsletter-subscription.service';
import { toNewsletterSubscriptionDTO } from 'src/application/helper/to-dto/to.newsletter-subscription.dto';
import { NewsletterSubscriptionDTO } from 'src/presentation/dtos/newsletter-subscription.dto';

/**
 * Use case class to fetch a newsletter subscription by email.
 */
@Injectable()
export class FetchNewsletterSubscriptionByEmail {
  constructor(private readonly service: NewsletterSubscriptionService) {}

  /**
   * Execute the use case to fetch a subscription by email.
   * @param email - The email of the subscription to fetch.
   * @param shopId - The ID of the shop to fetch the subscription for.
   * @returns The subscription data as a DTO, or null if not found.
   */
  async execute(
    email: string,
    shopId: number,
  ): Promise<NewsletterSubscriptionDTO | null> {
    const subscription = await this.service.getSubscriptionByEmail(
      email,
      shopId,
    );
    if (!subscription) return null;
    return toNewsletterSubscriptionDTO(subscription);
  }
}
