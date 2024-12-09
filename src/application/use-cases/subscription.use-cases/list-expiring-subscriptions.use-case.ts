import { Injectable } from '@nestjs/common';
import { toSubscriptionDTO } from '../../../application/helper/to-dto/to.subscription.dto';
import { SubscriptionService } from '../../../application/services/subscription.service';
import { SubscriptionDTO } from '../../../presentation/dtos/subscription.dto';

/**
 * Use case class for listing subscriptions expiring within a certain period.
 * This class encapsulates the business logic for retrieving subscriptions expiring soon.
 */
@Injectable()
export class ListExpiringSubscriptions {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  /**
   * Execute the list-expiring-subscriptions use case.
   * @param days - Number of days within which the subscriptions are expiring.
   * @returns A promise that resolves to an array of expiring Subscription DTOs.
   */
  async execute(days: number): Promise<SubscriptionDTO[]> {
    const subscriptions =
      await this.subscriptionService.getExpiringSubscriptions(days);
    return subscriptions?.map(toSubscriptionDTO);
  }
}
