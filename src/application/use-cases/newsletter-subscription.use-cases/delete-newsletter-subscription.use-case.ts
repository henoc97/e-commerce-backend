import { Injectable } from '@nestjs/common';
import { NewsletterSubscriptionService } from 'src/application/services/newsletter-subscription.service';

/**
 * Use case class to delete a newsletter subscription.
 */
@Injectable()
export class DeleteNewsletterSubscription {
  constructor(private readonly service: NewsletterSubscriptionService) {}

  /**
   * Execute the use case to delete a subscription by ID.
   * @param id - The ID of the subscription to delete.
   * @returns A boolean indicating if the deletion was successful.
   */
  async execute(id: number): Promise<boolean> {
    return await this.service.deleteSubscription(id);
  }
}
