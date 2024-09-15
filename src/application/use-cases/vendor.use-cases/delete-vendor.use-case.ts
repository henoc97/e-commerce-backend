import { Injectable } from '@nestjs/common';
import { VendorService } from 'src/application/services/vendor.service';

/**
 * Use case class for deleting a vendor.
 * This class encapsulates the business logic for deleting a vendor.
 * It interacts with the Vendor service to perform operations on vendor repository.
 */
@Injectable()
export class DeleteVendor {
  constructor(private readonly vendorService: VendorService) {}

  /**
   * Execute the delete-vendor use case.
   * @param vendorId - The unique identifier of the vendor to be deleted.
   * @returns A promise that resolves to a boolean indicating success or failure.
   */
  async execute(vendorId: number): Promise<boolean> {
    return this.vendorService.deleteVendor(vendorId);
  }
}
