import { Product } from 'src/domain/entities/product.entity';
import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { fromCartItemDTO } from './to.cart-item.entity';
import { fromOrderItemDTO } from './to.order-item.entity';
import { fromProductImageDTO } from './to.product-image.entity';
import { fromProductVariantDTO } from './to.product-variant.entity';
import { fromPromotionDTO } from './to.promotion.entity';
import { fromReviewDTO } from './to.review.entity';
import { fromShopDTO } from './to.shop.entity';
import { fromVendorDTO } from './to.vendor.entity';
import { fromCategoryDTO } from './to.category.entity';

/**
 * Converts a ProductDTO to a Product entity.
 * @param productDTO - The ProductDTO to convert.
 * @returns The corresponding Product entity.
 */
export function fromProductDTO(
  productDTO: ProductDTO | Partial<ProductDTO>,
): Product {
  return new Product(
    productDTO.id,
    productDTO.name,
    productDTO.price,
    productDTO.promotions.map((p) => fromPromotionDTO(p)),
    productDTO.category ? fromCategoryDTO(productDTO.category) : undefined,
    productDTO.categoryId,
    productDTO.images.map((img) => fromProductImageDTO(img)),
    productDTO.variants.map((v) => fromProductVariantDTO(v)),
    productDTO.stock,
    productDTO.shopId,
    productDTO.createdAt,
    productDTO.updatedAt,
    productDTO.CartItem.map((ci) => fromCartItemDTO(ci)),
    productDTO.OrderItem.map((oi) => fromOrderItemDTO(oi)),
    productDTO.Review.map((r) => fromReviewDTO(r)),
    productDTO.shop ? fromShopDTO(productDTO.shop) : undefined,
    productDTO.description,
    productDTO.vendor ? fromVendorDTO(productDTO.vendor) : undefined,
    productDTO.vendorId,
  );
}
