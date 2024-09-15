import { Injectable } from '@nestjs/common';
import { ProductVariantService } from 'src/application/services/product-variant.service';

/**
 * Use case class for deleting all product variants by product ID.
 * This class encapsulates the business logic for removing all variants associated with a product.
 * It interacts with the ProductVariant service to perform operations on product variant repository.
 */
@Injectable()
export class DeleteProductVariantsByProductId {
  constructor(private readonly service: ProductVariantService) {}

  /**
   * Execute the delete-product-variants-by-product-id use case.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async execute(productId: number): Promise<boolean> {
    return this.service.deleteProductVariantsByProductId(productId);
  }
}
