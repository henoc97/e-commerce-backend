import { Injectable } from '@nestjs/common';
import { VendorService } from '../../../application/services/vendor.service';
import { VendorDTO } from '../../../presentation/dtos/vendor.dto';
import { toVendorDTO } from '../../../application/helper/to-dto/to.vendor.dto';

/**
 * Use case class for listing vendors.
 * This class encapsulates the business logic for retrieving a list of vendors.
 * It interacts with the Vendor service to perform operations on vendor repository.
 */
@Injectable()
export class VendorList {
  constructor(private readonly vendorService: VendorService) { }

  /**
   * Execute the vendor-list use case.
   * @returns A promise that resolves to an array of VendorDTOs.
   */
  async execute(): Promise<VendorDTO[]> {
    const vendors = await this.vendorService.getAllVendors();

    return vendors?.map(toVendorDTO);
  }
}
