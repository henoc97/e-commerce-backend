import { Injectable } from '@nestjs/common';
import { VendorService } from '../../../application/services/vendor.service';
import { VendorDTO } from '../../../presentation/dtos/vendor.dto';
import { toVendorDTO } from '../../../application/helper/to-dto/to.vendor.dto';

/**
 * Use case class for finding vendors by their subscription ID.
 * This class encapsulates the business logic for retrieving vendors based on subscription ID.
 * It interacts with the Vendor service to perform operations on vendor repository.
 */
@Injectable()
export class FindVendorsBySubscription {
  constructor(private readonly vendorService: VendorService) { }

  /**
   * Execute the find-vendors-by-subscription use case.
   * @param subscriptionId - The unique identifier of the subscription.
   * @returns A promise that resolves to an array of VendorDTOs with the specified subscription.
   */
  async execute(subscriptionId: number): Promise<VendorDTO[]> {
    const vendors =
      await this.vendorService.findVendorsBySubscription(subscriptionId);

    return vendors?.map(toVendorDTO);
  }
}
