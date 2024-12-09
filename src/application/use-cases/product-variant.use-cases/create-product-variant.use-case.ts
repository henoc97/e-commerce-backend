import { Injectable } from '@nestjs/common';
import { ProductVariantService } from '../../../application/services/product-variant.service';
import { ProductVariantDTO } from '../../../presentation/dtos/product-variant.dto';
import { toProductVariantDTO } from '../../../application/helper/to-dto/to.product-variant.dto';

/**
 * Use case class for creating a new product variant.
 * This class encapsulates the business logic for creating a new variant.
 * It interacts with the ProductVariant service to perform operations on product variant repository.
 */
@Injectable()
export class CreateProductVariant {
  constructor(private readonly service: ProductVariantService) { }

  /**
   * Execute the create-product-variant use case.
   * @param variantDTO - The ProductVariantDTO containing the variant data to be created.
   * @returns A promise that resolves to the created ProductVariantDTO.
   */
  async execute(
    variantDTO: ProductVariantDTO,
  ): Promise<ProductVariantDTO | null> {
    const variant = await this.service.createProductVariant(variantDTO);

    if (!variant) return null;

    return toProductVariantDTO(variant);
  }
}
