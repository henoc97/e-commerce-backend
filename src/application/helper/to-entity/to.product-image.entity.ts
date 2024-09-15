import { ProductImage } from 'src/domain/entities/product-image.entity';
import { ProductImageDTO } from 'src/presentation/dtos/product-image.dto';
import { fromProductDTO } from './to.product.entity';

/**
 * Converts a ProductImageDTO to a ProductImage entity.
 * @param productImageDTO - The ProductImageDTO to convert.
 * @returns The corresponding ProductImage entity.
 */
export function fromProductImageDTO(
  productImageDTO: ProductImageDTO | Partial<ProductImageDTO>,
): ProductImage {
  return new ProductImage(
    productImageDTO.id,
    productImageDTO.productId,
    productImageDTO.product
      ? fromProductDTO(productImageDTO.product)
      : undefined,
    productImageDTO.url,
  );
}
