import { Injectable } from '@nestjs/common';
import { ProductVariantService } from 'src/application/services/product-variant.service';
import { ProductVariantDTO } from 'src/presentation/dtos/product-variant.dto';
import { toProductVariantDTO } from 'src/application/helper/to-dto/to.product-variant.dto';

/**
 * Use case class for updating product variant details.
 * This class encapsulates the business logic for modifying the name or value of a product variant.
 * It interacts with the ProductVariant service to perform operations on product variant repository.
 */
@Injectable()
export class UpdateProductVariantDetails {
  constructor(private readonly service: ProductVariantService) {}

  /**
   * Execute the update-product-variant-details use case.
   * @param id - The unique ID of the ProductVariant to be updated.
   * @param updateData - The partial data to update the ProductVariant.
   * @returns A promise that resolves to the updated ProductVariantDTO if successful, otherwise null.
   */
  async execute(
    id: number,
    updateData: Partial<ProductVariantDTO>,
  ): Promise<ProductVariantDTO | null> {
    const variant = await this.service.updateProductVariant(id, updateData);

    if (!variant) return null;

    return toProductVariantDTO(variant);
  }
}
