import { Injectable } from '@nestjs/common';
import { ProductVariantService } from '../../../application/services/product-variant.service';

/**
 * Use case class for checking the existence of a product variant.
 * This class encapsulates the business logic for verifying if a variant exists.
 * It interacts with the ProductVariant service to perform operations on product variant repository.
 */
@Injectable()
export class CheckProductVariantExistence {
  constructor(private readonly service: ProductVariantService) { }

  /**
   * Execute the check-product-variant-existence use case.
   * @param productId - The unique ID of the product.
   * @param name - The name of the ProductVariant.
   * @param value - The value of the ProductVariant.
   * @returns A promise that resolves to true if the variant exists, otherwise false.
   */
  async execute(
    productId: number,
    name: string,
    value: string,
  ): Promise<boolean> {
    return this.service.productVariantExists(productId, name, value);
  }
}
