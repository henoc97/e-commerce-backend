import { Injectable } from '@nestjs/common';
import { toSubscriptionDTO } from '../../../application/helper/to-dto/to.subscription.dto';
import { SubscriptionService } from '../../../application/services/subscription.service';
import { SubscriptionDTO } from '../../../presentation/dtos/subscription.dto';

/**
 * Use case class for listing all active subscriptions.
 * This class encapsulates the business logic for retrieving active subscriptions.
 */
@Injectable()
export class ListActiveSubscriptions {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  /**
   * Execute the list-active-subscriptions use case.
   * @returns A promise that resolves to an array of active Subscription DTOs.
   */
  async execute(): Promise<SubscriptionDTO[]> {
    const subscriptions =
      await this.subscriptionService.getActiveSubscriptions();
    return subscriptions?.map(toSubscriptionDTO);
  }
}
