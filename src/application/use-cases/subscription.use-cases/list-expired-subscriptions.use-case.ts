import { Injectable } from '@nestjs/common';
import { toSubscriptionDTO } from 'src/application/helper/to-dto/to.subscription.dto';
import { SubscriptionService } from 'src/application/services/subscription.service';
import { SubscriptionDTO } from 'src/presentation/dtos/subscription.dto';

/**
 * Use case class for listing all expired subscriptions.
 * This class encapsulates the business logic for retrieving expired subscriptions.
 */
@Injectable()
export class ListExpiredSubscriptions {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  /**
   * Execute the list-expired-subscriptions use case.
   * @returns A promise that resolves to an array of expired Subscription DTOs.
   */
  async execute(): Promise<SubscriptionDTO[]> {
    const subscriptions =
      await this.subscriptionService.getExpiredSubscriptions();
    return subscriptions?.map(toSubscriptionDTO);
  }
}
