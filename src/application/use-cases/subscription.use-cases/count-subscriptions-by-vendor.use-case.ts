import { Injectable } from '@nestjs/common';
import { SubscriptionService } from 'src/application/services/subscription.service';

/**
 * Use case class for counting subscriptions by vendor.
 * This class encapsulates the business logic for counting subscriptions linked to a specific vendor.
 */
@Injectable()
export class CountSubscriptionsByVendor {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  /**
   * Execute the count-subscriptions-by-vendor use case.
   * @param vendorId - The ID of the vendor.
   * @returns A promise that resolves to the count of subscriptions.
   */
  async execute(vendorId: number): Promise<number> {
    return this.subscriptionService.countSubscriptionsByVendor(vendorId);
  }
}
