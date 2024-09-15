import { Injectable } from '@nestjs/common';
import { toSubscriptionDTO } from 'src/application/helper/to-dto/to.subscription.dto';
import { SubscriptionService } from 'src/application/services/subscription.service';
import { SubscriptionDTO } from 'src/presentation/dtos/subscription.dto';

/**
 * Use case class for fetching the latest subscription.
 * This class encapsulates the business logic for retrieving the most recent subscription.
 */
@Injectable()
export class FetchLatestSubscription {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  /**
   * Execute the fetch-latest-subscription use case.
   * @returns A promise that resolves to the latest Subscription DTO.
   */
  async execute(): Promise<SubscriptionDTO | null> {
    const subscription = await this.subscriptionService.getLatestSubscription();

    if (!subscription) return null;

    return toSubscriptionDTO(subscription);
  }
}
