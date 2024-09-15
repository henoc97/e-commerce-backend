import { Injectable } from '@nestjs/common';
import { VendorService } from 'src/application/services/vendor.service';
import { SubscriptionDTO } from 'src/presentation/dtos/subscription.dto';
import { toVendorDTO } from 'src/application/helper/to-dto/to.vendor.dto';
import { VendorDTO } from 'src/presentation/dtos/vendor.dto';

/**
 * Use case class for associating a subscription with a vendor.
 * This class encapsulates the business logic for setting the subscription information.
 * It interacts with the Vendor service to perform operations on the vendor repository.
 */
@Injectable()
export class SetVendorSubscription {
  constructor(private readonly vendorService: VendorService) {}

  /**
   * Execute the set-vendor-subscription use case.
   * @param vendorId - The ID of the vendor to which the subscription is to be associated.
   * @param subscriptionDTO - The DTO containing the subscription information to be associated with the vendor.
   * @returns A promise that resolves to the updated VendorDTO if successful, otherwise null.
   */
  async execute(
    vendorId: number,
    subscriptionDTO: SubscriptionDTO,
  ): Promise<VendorDTO | null> {
    const updatedVendor = await this.vendorService.setVendorSubscription(
      vendorId,
      subscriptionDTO,
    );

    if (!updatedVendor) return null;

    const result = toVendorDTO(updatedVendor);
    return result;
  }
}
