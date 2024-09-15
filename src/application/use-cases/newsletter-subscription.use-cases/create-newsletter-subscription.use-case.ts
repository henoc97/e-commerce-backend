import { Injectable } from '@nestjs/common';
import { NewsletterSubscriptionService } from 'src/application/services/newsletter-subscription.service';
import { NewsletterSubscriptionDTO } from 'src/presentation/dtos/newsletter-subscription.dto';
import { toNewsletterSubscriptionDTO } from 'src/application/helper/to-dto/to.newsletter-subscription.dto';

/**
 * Use case class to create a new newsletter subscription.
 */
@Injectable()
export class CreateNewsletterSubscription {
  constructor(private readonly service: NewsletterSubscriptionService) {}

  /**
   * Execute the use case to create a new subscription.
   * @param dto - The newsletter subscription data.
   * @returns The created subscription as a DTO.
   */
  async execute(
    dto: NewsletterSubscriptionDTO,
  ): Promise<NewsletterSubscriptionDTO | null> {
    const subscription = await this.service.createSubscription(dto);

    if (!subscription) return null;

    return toNewsletterSubscriptionDTO(subscription);
  }
}
