import { Injectable } from '@nestjs/common';
import { VendorService } from 'src/application/services/vendor.service';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';
import { toVendorDTO } from 'src/application/helper/to-dto/to.vendor.dto';
import { VendorDTO } from 'src/presentation/dtos/vendor.dto';

/**
 * Use case class for associating a shop with a vendor.
 * This class encapsulates the business logic for setting the shop information.
 * It interacts with the Vendor service to perform operations on the vendor repository.
 */
@Injectable()
export class SetVendorShop {
  constructor(private readonly vendorService: VendorService) {}

  /**
   * Execute the set-vendor-shop use case.
   * @param vendorId - The ID of the vendor to which the shop is to be associated.
   * @param shopDTO - The DTO containing the shop information to be associated with the vendor.
   * @returns A promise that resolves to the updated VendorDTO if successful, otherwise null.
   */
  async execute(vendorId: number, shopDTO: ShopDTO): Promise<VendorDTO | null> {
    const updatedVendor = await this.vendorService.setVendorShop(
      vendorId,
      shopDTO,
    );

    if (!updatedVendor) return null;

    const result = toVendorDTO(updatedVendor);
    return result;
  }
}
