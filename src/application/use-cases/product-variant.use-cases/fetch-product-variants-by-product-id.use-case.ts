import { Injectable } from '@nestjs/common';
import { ProductVariantService } from '../../../application/services/product-variant.service';
import { toProductVariantDTO } from '../../../application/helper/to-dto/to.product-variant.dto';
import { ProductVariantDTO } from '../../../presentation/dtos/product-variant.dto';

/**
 * Use case class for fetching product variants by product ID.
 * This class encapsulates the business logic for retrieving all variants associated with a product.
 * It interacts with the ProductVariant service to perform operations on product variant repository.
 */
@Injectable()
export class FetchProductVariantsByProductId {
  constructor(private readonly service: ProductVariantService) { }

  /**
   * Execute the fetch-product-variants-by-product-id use case.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to an array of ProductVariantDTOs associated with the product.
   */
  async execute(productId: number): Promise<ProductVariantDTO[]> {
    const variants =
      await this.service.getProductVariantsByProductId(productId);

    return variants?.map(toProductVariantDTO);
  }
}
