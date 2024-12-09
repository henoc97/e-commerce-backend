import { ProductImage } from '../../../domain/entities/product-image.entity';
import { fromProductPrisma } from './to.product.entity';

/**
 * Converts a ProductImagePrisma to a ProductImage entity.
 * @param productImagePrisma - The ProductImagePrisma to convert.
 * @returns The corresponding ProductImage entity.
 */
export function fromProductImagePrisma(productImagePrisma: any): ProductImage {
  return new ProductImage(
    productImagePrisma.id,
    productImagePrisma.productId,
    productImagePrisma.product
      ? fromProductPrisma(productImagePrisma.product)
      : undefined,
    productImagePrisma.url,
  );
}
