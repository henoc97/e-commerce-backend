import { Injectable } from '@nestjs/common';
import { toSubscriptionDTO } from 'src/application/helper/to-dto/to.subscription.dto';
import { SubscriptionService } from 'src/application/services/subscription.service';
import { SubscriptionDTO } from 'src/presentation/dtos/subscription.dto';

/**
 * Use case class for listing all subscriptions by a specific vendor.
 * This class encapsulates the business logic for retrieving subscriptions associated with a vendor.
 */
@Injectable()
export class ListSubscriptionsByVendor {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  /**
   * Execute the list-subscriptions-by-vendor use case.
   * @param vendorId - The ID of the vendor.
   * @returns A promise that resolves to an array of Subscription DTOs linked to the vendor.
   */
  async execute(vendorId: number): Promise<SubscriptionDTO[]> {
    const subscriptions =
      await this.subscriptionService.getSubscriptionsByVendor(vendorId);
    return subscriptions?.map(toSubscriptionDTO);
  }
}
