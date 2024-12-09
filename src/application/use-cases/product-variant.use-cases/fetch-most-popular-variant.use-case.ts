import { Injectable } from '@nestjs/common';
import { ProductVariantService } from '../../../application/services/product-variant.service';
import { toProductVariantDTO } from '../../../application/helper/to-dto/to.product-variant.dto';
import { ProductVariantDTO } from '../../../presentation/dtos/product-variant.dto';

/**
 * Use case class for fetching the most popular product variant.
 * This class encapsulates the business logic for retrieving the most popular variant based on sales or views.
 * It interacts with the ProductVariant service to perform operations on product variant repository.
 */
@Injectable()
export class FetchMostPopularVariant {
  constructor(private readonly service: ProductVariantService) { }

  /**
   * Execute the fetch-most-popular-variant use case.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to the most popular ProductVariantDTO if found, otherwise null.
   */
  async execute(productId: number): Promise<ProductVariantDTO | null> {
    const variant = await this.service.getMostPopularVariant(productId);

    if (!variant) return null;

    return toProductVariantDTO(variant);
  }
}
