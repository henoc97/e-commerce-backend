import { Injectable } from '@nestjs/common';
import { toSubscriptionDTO } from '../../../application/helper/to-dto/to.subscription.dto';
import { SubscriptionService } from '../../../application/services/subscription.service';
import { SubscriptionDTO } from '../../../presentation/dtos/subscription.dto';

/**
 * Use case class for fetching a subscription by its ID.
 * This class encapsulates the business logic for retrieving a subscription by its unique identifier.
 */
@Injectable()
export class FetchSubscriptionById {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  /**
   * Execute the fetch-subscription-by-id use case.
   * @param id - The ID of the subscription.
   * @returns A promise that resolves to the Subscription DTO if found, otherwise null.
   */
  async execute(id: number): Promise<SubscriptionDTO | null> {
    const subscription = await this.subscriptionService.getSubscriptionById(id);

    if (!subscription) return null;

    return toSubscriptionDTO(subscription);
  }
}
