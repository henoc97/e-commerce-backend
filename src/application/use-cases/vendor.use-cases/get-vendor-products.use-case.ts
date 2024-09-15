import { Injectable } from '@nestjs/common';
import { VendorService } from 'src/application/services/vendor.service';
import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { toProductDTO } from 'src/application/helper/to-dto/to.product.dto';

/**
 * Use case class for retrieving all products associated with a vendor.
 * This class encapsulates the business logic for retrieving products for a given vendor.
 * It interacts with the Vendor service to perform operations on vendor repository.
 */
@Injectable()
export class GetVendorProducts {
  constructor(private readonly vendorService: VendorService) {}

  /**
   * Execute the get-vendor-products use case.
   * @param vendorId - The unique identifier of the vendor.
   * @returns A promise that resolves to an array of ProductDTOs associated with the vendor.
   */
  async execute(vendorId: number): Promise<ProductDTO[]> {
    const products = await this.vendorService.getVendorProducts(vendorId);

    return products.map(toProductDTO);
  }
}
