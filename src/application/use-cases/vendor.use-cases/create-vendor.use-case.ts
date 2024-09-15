import { Injectable } from '@nestjs/common';
import { VendorDTO } from 'src/presentation/dtos/vendor.dto';
import { VendorService } from 'src/application/services/vendor.service';
import { toVendorDTO } from 'src/application/helper/to-dto/to.vendor.dto';

/**
 * Use case class for creating a vendor.
 * This class encapsulates the business logic for creating a vendor.
 * It interacts with the Vendor service to perform operations on vendor repository.
 */
@Injectable()
export class CreateVendor {
  constructor(private readonly vendorService: VendorService) {}

  /**
   * Execute the create-vendor use case.
   * @param vendorDTO - The VendorDTO containing the vendor data to be created.
   * @returns A promise that resolves to the created Vendor DTO.
   */
  async execute(vendorDTO: VendorDTO): Promise<VendorDTO | null> {
    const vendor = await this.vendorService.createVendor(vendorDTO);

    if (!vendor) return null;

    const result = toVendorDTO(vendor);
    return result;
  }
}
