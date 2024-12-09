import { Injectable } from '@nestjs/common';
import { NewsletterSubscriptionService } from '../../../application/services/newsletter-subscription.service';

/**
 * Use case class to check if an email is subscribed.
 */
@Injectable()
export class CheckEmailSubscribed {
  constructor(private readonly service: NewsletterSubscriptionService) { }

  /**
   * Execute the use case to check email subscription status.
   * @param email - The email to check.
   * @param shopId - The ID of the shop to check.
   * @returns A boolean indicating if the email is subscribed.
   */
  async execute(email: string, shopId: number): Promise<boolean> {
    const isSubscribed = await this.service.isEmailSubscribed(email, shopId);
    return isSubscribed;
  }
}
