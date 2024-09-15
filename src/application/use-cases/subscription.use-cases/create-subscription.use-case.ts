import { Injectable } from '@nestjs/common';
import { toSubscriptionDTO } from 'src/application/helper/to-dto/to.subscription.dto';
import { SubscriptionService } from 'src/application/services/subscription.service';
import { SubscriptionDTO } from 'src/presentation/dtos/subscription.dto';

/**
 * Use case class for creating a new subscription.
 * This class encapsulates the business logic for creating a new subscription.
 */
@Injectable()
export class CreateSubscription {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  /**
   * Execute the create-subscription use case.
   * @param subscriptionDTO - The SubscriptionDTO containing the subscription data to be created.
   * @returns A promise that resolves to the created Subscription DTO.
   */
  async execute(
    subscriptionDTO: SubscriptionDTO,
  ): Promise<SubscriptionDTO | null> {
    const subscription =
      await this.subscriptionService.createSubscription(subscriptionDTO);

    if (!subscription) return null;

    return toSubscriptionDTO(subscription);
  }
}
