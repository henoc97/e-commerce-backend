import { ProductVariant } from 'src/domain/entities/product-variant.entity';
import { fromProductPrisma } from './to.product.entity';

/**
 * Converts a ProductVariantPrisma to a ProductVariant entity.
 * @param productVariantPrisma - The ProductVariantPrisma to convert.
 * @returns The corresponding ProductVariant entity.
 */
export function fromProductVariantPrisma(
  productVariantPrisma: any,
): ProductVariant {
  return new ProductVariant(
    productVariantPrisma.id,
    productVariantPrisma.productId,
    productVariantPrisma.product
      ? fromProductPrisma(productVariantPrisma.product)
      : undefined,
    productVariantPrisma.name,
    productVariantPrisma.value,
  );
}
