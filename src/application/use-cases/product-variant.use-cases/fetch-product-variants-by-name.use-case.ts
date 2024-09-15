import { Injectable } from '@nestjs/common';
import { ProductVariantService } from 'src/application/services/product-variant.service';
import { toProductVariantDTO } from 'src/application/helper/to-dto/to.product-variant.dto';
import { ProductVariantDTO } from 'src/presentation/dtos/product-variant.dto';

/**
 * Use case class for fetching product variants by name.
 * This class encapsulates the business logic for retrieving variants with a specific name.
 * It interacts with the ProductVariant service to perform operations on product variant repository.
 */
@Injectable()
export class FetchProductVariantsByName {
  constructor(private readonly service: ProductVariantService) {}

  /**
   * Execute the fetch-product-variants-by-name use case.
   * @param productId - The unique ID of the product.
   * @param name - The name of the ProductVariants to retrieve.
   * @returns A promise that resolves to an array of ProductVariantDTOs with the given name.
   */
  async execute(productId: number, name: string): Promise<ProductVariantDTO[]> {
    const variants = await this.service.getProductVariantsByName(
      productId,
      name,
    );

    return variants.map(toProductVariantDTO);
  }
}
