import { Injectable } from '@nestjs/common';
import { VendorService } from 'src/application/services/vendor.service';
import { VendorDTO } from 'src/presentation/dtos/vendor.dto';
import { toVendorDTO } from 'src/application/helper/to-dto/to.vendor.dto';

/**
 * Use case class for finding a vendor by its ID.
 * This class encapsulates the business logic for retrieving a vendor by its ID.
 * It interacts with the Vendor service to perform operations on vendor repository.
 */
@Injectable()
export class FindVendorById {
  constructor(private readonly vendorService: VendorService) {}

  /**
   * Execute the find-vendor-by-id use case.
   * @param vendorId - The unique identifier of the vendor to be retrieved.
   * @returns A promise that resolves to the VendorDTO if found, otherwise null.
   */
  async execute(vendorId: number): Promise<VendorDTO | null> {
    const vendor = await this.vendorService.findVendorById(vendorId);

    if (!vendor) return null;

    const result = toVendorDTO(vendor);
    return result;
  }
}
