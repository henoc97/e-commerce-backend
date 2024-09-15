import { Injectable } from '@nestjs/common';
import { ProductVariantService } from 'src/application/services/product-variant.service';
import { toProductVariantDTO } from 'src/application/helper/to-dto/to.product-variant.dto';
import { ProductVariantDTO } from 'src/presentation/dtos/product-variant.dto';

/**
 * Use case class for fetching a product variant by ID.
 * This class encapsulates the business logic for retrieving a variant by its unique ID.
 * It interacts with the ProductVariant service to perform operations on product variant repository.
 */
@Injectable()
export class FetchProductVariantById {
  constructor(private readonly service: ProductVariantService) {}

  /**
   * Execute the fetch-product-variant-by-id use case.
   * @param id - The unique ID of the ProductVariant.
   * @returns A promise that resolves to the ProductVariantDTO if found, otherwise null.
   */
  async execute(id: number): Promise<ProductVariantDTO | null> {
    const variant = await this.service.getProductVariantById(id);

    if (!variant) return null;

    return toProductVariantDTO(variant);
  }
}
