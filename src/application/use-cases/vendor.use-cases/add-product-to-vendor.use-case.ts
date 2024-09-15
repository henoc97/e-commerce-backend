import { Injectable } from '@nestjs/common';
import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { VendorService } from 'src/application/services/vendor.service';
import { toVendorDTO } from 'src/application/helper/to-dto/to.vendor.dto';
import { VendorDTO } from 'src/presentation/dtos/vendor.dto';

/**
 * Use case class for adding a product to a vendor.
 * This class encapsulates the business logic for adding a product to a vendor.
 * It interacts with the Vendor service to perform operations on vendor repository.
 */
@Injectable()
export class AddProductToVendor {
  constructor(private readonly vendorService: VendorService) {}

  /**
   * Execute the add-product-to-vendor use case.
   * @param vendorId - The unique identifier of the vendor.
   * @param productDTO - The ProductDTO containing the product data to be added.
   * @returns A promise that resolves to the updated Vendor DTO.
   */
  async execute(
    vendorId: number,
    productDTO: ProductDTO,
  ): Promise<VendorDTO | null> {
    const updatedVendor = await this.vendorService.addProductToVendor(
      vendorId,
      productDTO,
    );

    if (!updatedVendor) return null;

    const result = toVendorDTO(updatedVendor);
    return result;
  }
}
