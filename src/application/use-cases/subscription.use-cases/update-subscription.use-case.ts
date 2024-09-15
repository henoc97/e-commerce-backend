import { Injectable } from '@nestjs/common';
import { toSubscriptionDTO } from 'src/application/helper/to-dto/to.subscription.dto';
import { SubscriptionService } from 'src/application/services/subscription.service';
import { SubscriptionDTO } from 'src/presentation/dtos/subscription.dto';

/**
 * Use case class for updating a subscription.
 * This class encapsulates the business logic for updating subscription details.
 */
@Injectable()
export class UpdateSubscription {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  /**
   * Execute the update-subscription use case.
   * @param id - The ID of the subscription to be updated.
   * @param updates - The partial fields to be updated.
   * @returns A promise that resolves to the updated Subscription DTO.
   */
  async execute(
    id: number,
    updates: Partial<SubscriptionDTO>,
  ): Promise<SubscriptionDTO | null> {
    const updatedSubscription =
      await this.subscriptionService.updateSubscription(id, updates);

    if (!updatedSubscription) return null;

    return toSubscriptionDTO(updatedSubscription);
  }
}
