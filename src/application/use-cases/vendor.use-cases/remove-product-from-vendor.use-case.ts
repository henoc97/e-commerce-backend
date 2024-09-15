import { toVendorDTO } from 'src/application/helper/to-dto/to.vendor.dto';
import { VendorService } from 'src/application/services/vendor.service';
import { VendorDTO } from 'src/presentation/dtos/vendor.dto';

/**
 * Use case class for RemoveProductFromVendor.
 */
export class RemoveProductFromVendor {
  constructor(private readonly vendorService: VendorService) {}

  /**
   * Execute the vendor-product-management use case for removing a product.
   * @param vendorId - The unique identifier of the vendor.
   * @param productId - The unique identifier of the product to be removed.
   * @returns A promise that resolves to the updated VendorDTO if successful, otherwise null.
   */
  async execute(
    vendorId: number,
    productId: number,
  ): Promise<VendorDTO | null> {
    const updatedVendor = await this.vendorService.removeProductFromVendor(
      vendorId,
      productId,
    );

    if (!updatedVendor) return null;

    return toVendorDTO(updatedVendor);
  }
}
