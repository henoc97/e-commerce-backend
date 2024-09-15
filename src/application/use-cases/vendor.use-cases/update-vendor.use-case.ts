import { Injectable } from '@nestjs/common';
import { VendorDTO } from 'src/presentation/dtos/vendor.dto';
import { VendorService } from 'src/application/services/vendor.service';
import { toVendorDTO } from 'src/application/helper/to-dto/to.vendor.dto';

/**
 * Use case class for updating a vendor's information.
 * This class encapsulates the business logic for updating vendor details.
 * It interacts with the Vendor service to perform operations on vendor repository.
 */
@Injectable()
export class UpdateVendor {
  constructor(private readonly vendorService: VendorService) {}

  /**
   * Execute the update-vendor use case.
   * @param vendorId - The unique identifier of the vendor to be updated.
   * @param vendorDTO - Partial fields to update.
   * @returns A promise that resolves to the updated VendorDTO if successful, otherwise null.
   */
  async execute(
    vendorId: number,
    vendorDTO: Partial<VendorDTO>,
  ): Promise<VendorDTO | null> {
    const updatedVendor = await this.vendorService.updateVendor(
      vendorId,
      vendorDTO,
    );

    if (!updatedVendor) return null;

    const result = toVendorDTO(updatedVendor);
    return result;
  }
}
