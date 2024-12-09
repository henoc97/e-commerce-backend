import { ProductImage } from '../../../domain/entities/product-image.entity';
import { ProductImageDTO } from '../../../presentation/dtos/product-image.dto';
import { toProductDTO } from './to.product.dto';

/**
 * Converts a ProductImage entity to a ProductImageDTO.
 * @param productImage - The ProductImage entity to convert.
 * @returns The corresponding ProductImageDTO.
 */
export function toProductImageDTO(productImage: any): ProductImageDTO {
  return new ProductImageDTO(
    productImage.id,
    productImage.productId,
    productImage.product ? toProductDTO(productImage.product) : undefined,
    productImage.url,
  );
}
