import { Injectable } from '@nestjs/common';
import { NewsletterSubscriptionService } from 'src/application/services/newsletter-subscription.service';
import { toNewsletterSubscriptionDTO } from 'src/application/helper/to-dto/to.newsletter-subscription.dto';

/**
 * Use case class to fetch newsletter subscriptions by date range.
 */
@Injectable()
export class FetchNewsletterSubscriptionsByDateRange {
  constructor(private readonly service: NewsletterSubscriptionService) {}

  /**
   * Execute the use case to fetch subscriptions within a date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns An array of subscription DTOs.
   */
  async execute(
    startDate: Date,
    endDate: Date,
  ): Promise<NewsletterSubscriptionDTO[]> {
    const subscriptions = await this.service.getSubscriptionsByDateRange(
      startDate,
      endDate,
    );
    return subscriptions.map(toNewsletterSubscriptionDTO);
  }
}
