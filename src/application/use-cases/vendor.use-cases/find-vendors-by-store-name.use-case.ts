import { Injectable } from '@nestjs/common';
import { VendorService } from 'src/application/services/vendor.service';
import { VendorDTO } from 'src/presentation/dtos/vendor.dto';
import { toVendorDTO } from 'src/application/helper/to-dto/to.vendor.dto';

/**
 * Use case class for finding vendors by their store name.
 * This class encapsulates the business logic for retrieving vendors based on store name.
 * It interacts with the Vendor service to perform operations on vendor repository.
 */
@Injectable()
export class FindVendorsByStoreName {
  constructor(private readonly vendorService: VendorService) { }

  /**
   * Execute the find-vendors-by-store-name use case.
   * @param storeName - The name of the store to search for.
   * @returns A promise that resolves to an array of VendorDTOs matching the given store name.
   */
  async execute(storeName: string): Promise<VendorDTO[]> {
    const vendors = await this.vendorService.findVendorsByStoreName(storeName);

    return vendors?.map(toVendorDTO);
  }
}
