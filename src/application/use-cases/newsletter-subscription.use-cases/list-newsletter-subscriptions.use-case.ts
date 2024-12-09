import { Injectable } from '@nestjs/common';
import { NewsletterSubscriptionService } from '../../../application/services/newsletter-subscription.service';
import { toNewsletterSubscriptionDTO } from '../../../application/helper/to-dto/to.newsletter-subscription.dto';
import { NewsletterSubscriptionDTO } from '../../../presentation/dtos/newsletter-subscription.dto';

/**
 * Use case class to list all newsletter subscriptions.
 */
@Injectable()
export class ListNewsletterSubscriptions {
  constructor(private readonly service: NewsletterSubscriptionService) { }

  /**
   * Execute the use case to list all subscriptions.
   * @param shopId - The ID of the shop to list the subscriptions for.
   * @returns An array of subscription DTOs.
   */
  async execute(shopId: number): Promise<NewsletterSubscriptionDTO[]> {
    const subscriptions = await this.service.listAllSubscriptions(shopId);
    return subscriptions?.map(toNewsletterSubscriptionDTO);
  }
}
