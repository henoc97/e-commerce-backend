import { Injectable } from '@nestjs/common';
import { VendorService } from '../../../application/services/vendor.service';
import { VendorDTO } from '../../../presentation/dtos/vendor.dto';
import { toVendorDTO } from '../../../application/helper/to-dto/to.vendor.dto';

/**
 * Use case class for finding vendors by the user they are associated with.
 * This class encapsulates the business logic for retrieving vendors based on user ID.
 * It interacts with the Vendor service to perform operations on vendor repository.
 */
@Injectable()
export class FindVendorsByUser {
  constructor(private readonly vendorService: VendorService) { }

  /**
   * Execute the find-vendors-by-user use case.
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves to an array of VendorDTOs associated with the user.
   */
  async execute(userId: number): Promise<VendorDTO[]> {
    const vendors = await this.vendorService.findVendorsByUser(userId);

    return vendors?.map(toVendorDTO);
  }
}
