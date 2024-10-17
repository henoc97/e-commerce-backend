import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { toCartItemDTO } from './to.cart-item.dto';
import { toCategoryDTO } from './to.category.dto';
import { toOrderItemDTO } from './to.order-item.dto';
import { toPromotionDTO } from './to.promotion.dto';
import { toVendorDTO } from './to.vendor.dto';
import { Product } from 'src/domain/entities/product.entity';
import { toReviewDTO } from './to.review.dto';
import { toShopDTO } from './to.shop.dto';
import { toProductImageDTO } from './to.product-image.dto';
import { toProductVariantDTO } from './to.product-variant.dto';

/**
 * Converts a Product entity to a ProductDTO.
 * @param product - The Product entity to convert.
 * @returns The corresponding ProductDTO.
 */
export function toProductDTO(product: Product): ProductDTO {
  return new ProductDTO(
    product.id,
    product.name,
    product.price,
    product.promotions.map((p) => toPromotionDTO(p)),
    product.category ? toCategoryDTO(product.category) : undefined,
    product.categoryId,
    product.images.map((img) => toProductImageDTO(img)),
    product.variants.map((v) => toProductVariantDTO(v)),
    product.stock,
    product.shop ? toShopDTO(product.shop) : undefined,
    product.shopId,
    product.createdAt,
    product.updatedAt,
    product.cartItem.map((ci) => toCartItemDTO(ci)),
    product.orderItem.map((oi) => toOrderItemDTO(oi)),
    product.review.map((r) => toReviewDTO(r)),
    product.description,
    product.vendor ? toVendorDTO(product.vendor) : undefined,
    product.vendorId,
  );
}
