import { Injectable } from '@nestjs/common';
import { VendorService } from 'src/application/services/vendor.service';
import { SubscriptionDTO } from 'src/presentation/dtos/subscription.dto';
import { toSubscriptionDTO } from 'src/application/helper/to-dto/to.subscription.dto';

/**
 * Use case class for retrieving the subscription details of a vendor.
 * This class encapsulates the business logic for fetching the subscription information.
 * It interacts with the Vendor service to perform operations on the vendor repository.
 */
@Injectable()
export class GetVendorSubscription {
  constructor(private readonly vendorService: VendorService) {}

  /**
   * Execute the get-vendor-subscription use case.
   * @param vendorId - The ID of the vendor whose subscription details are to be retrieved.
   * @returns A promise that resolves to the SubscriptionDTO of the associated subscription, or null if not found.
   */
  async execute(vendorId: number): Promise<SubscriptionDTO | null> {
    const subscription =
      await this.vendorService.getVendorSubscription(vendorId);

    if (!subscription) return null;

    const result = toSubscriptionDTO(subscription);
    return result;
  }
}
