import { ProductVariant } from '../../../domain/entities/product-variant.entity';
import { ProductVariantDTO } from '../../../presentation/dtos/product-variant.dto';
import { fromProductDTO } from './to.product.entity';

/**
 * Converts a ProductVariantDTO to a ProductVariant entity.
 * @param productVariantDTO - The ProductVariantDTO to convert.
 * @returns The corresponding ProductVariant entity.
 */
export function fromProductVariantDTO(
  productVariantDTO: ProductVariantDTO | Partial<ProductVariantDTO>,
): ProductVariant {
  return new ProductVariant(
    productVariantDTO.id,
    productVariantDTO.productId,
    productVariantDTO.product
      ? fromProductDTO(productVariantDTO.product)
      : undefined,
    productVariantDTO.name,
    productVariantDTO.value,
  );
}
