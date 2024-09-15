import { Injectable } from '@nestjs/common';
import { NewsletterSubscriptionService } from 'src/application/services/newsletter-subscription.service';
import { toNewsletterSubscriptionDTO } from 'src/application/helper/to-dto/to.newsletter-subscription.dto';

/**
 * Use case class to list all newsletter subscriptions.
 */
@Injectable()
export class ListNewsletterSubscriptions {
  constructor(private readonly service: NewsletterSubscriptionService) {}

  /**
   * Execute the use case to list all subscriptions.
   * @returns An array of subscription DTOs.
   */
  async execute(): Promise<NewsletterSubscriptionDTO[]> {
    const subscriptions = await this.service.listAllSubscriptions();
    return subscriptions.map(toNewsletterSubscriptionDTO);
  }
}
