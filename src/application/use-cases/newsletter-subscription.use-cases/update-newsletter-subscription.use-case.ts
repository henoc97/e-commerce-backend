import { Injectable } from '@nestjs/common';
import { NewsletterSubscriptionService } from 'src/application/services/newsletter-subscription.service';
import { NewsletterSubscriptionDTO } from 'src/presentation/dtos/newsletter-subscription.dto';
import { toNewsletterSubscriptionDTO } from 'src/application/helper/to-dto/to.newsletter-subscription.dto';

/**
 * Use case class to update a newsletter subscription.
 */
@Injectable()
export class UpdateNewsletterSubscription {
  constructor(private readonly service: NewsletterSubscriptionService) {}

  /**
   * Execute the use case to update a subscription.
   * @param id - The ID of the subscription to update.
   * @param dto - The new data for the subscription.
   * @returns The updated subscription DTO, or null if not found.
   */
  async execute(
    id: number,
    dto: Partial<NewsletterSubscriptionDTO>,
  ): Promise<NewsletterSubscriptionDTO | null> {
    const updatedSubscription = await this.service.updateSubscription(id, dto);
    if (!updatedSubscription) return null;
    return toNewsletterSubscriptionDTO(updatedSubscription);
  }
}
