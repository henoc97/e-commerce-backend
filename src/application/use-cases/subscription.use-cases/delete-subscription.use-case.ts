import { Injectable } from '@nestjs/common';
import { SubscriptionService } from 'src/application/services/subscription.service';

/**
 * Use case class for deleting a subscription.
 * This class encapsulates the business logic for deleting a subscription.
 */
@Injectable()
export class DeleteSubscription {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  /**
   * Execute the delete-subscription use case.
   * @param id - The ID of the subscription to be deleted.
   * @returns A promise that resolves to a boolean indicating success or failure.
   */
  async execute(id: number): Promise<boolean> {
    return this.subscriptionService.deleteSubscription(id);
  }
}
