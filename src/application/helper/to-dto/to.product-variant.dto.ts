import { ProductVariantDTO } from 'src/presentation/dtos/product-variant.dto';
import { toProductDTO } from './to.product.dto';
import { ProductVariant } from 'src/domain/entities/product-variant.entity';

/**
 * Converts a ProductVariant entity to a ProductVariantDTO.
 * @param productVariant - The ProductVariant entity to convert.
 * @returns The corresponding ProductVariantDTO.
 */
export function toProductVariantDTO(
  productVariant: ProductVariant,
): ProductVariantDTO {
  return new ProductVariantDTO(
    productVariant.id,
    productVariant.productId,
    productVariant.product ? toProductDTO(productVariant.product) : undefined,
    productVariant.name,
    productVariant.value,
  );
}
