import { Product } from 'src/domain/entities/product.entity';
import { fromCartItemPrisma } from './to.cart-item.entity';
import { fromOrderItemPrisma } from './to.order-item.entity';
import { fromPromotionPrisma } from './to.promotion.entity';
import { fromReviewPrisma } from './to.review.entity';
import { fromShopPrisma } from './to.shop.entity';
import { fromVendorPrisma } from './to.vendor.entity';
import { fromCategoryPrisma } from './to.category.entity';
import { fromProductImagePrisma } from './to.product-image.entity';
import { fromProductVariantPrisma } from './to.product-variant.entity';

/**
 * Converts a ProductPrisma to a Product entity.
 * @param productPrisma - The ProductPrisma to convert.
 * @returns The corresponding Product entity.
 */
export function fromProductPrisma(productPrisma: any): Product {
  return new Product(
    productPrisma.id,
    productPrisma.name,
    productPrisma.price,
    productPrisma.promotions.map((p: any) => fromPromotionPrisma(p)),
    productPrisma.category
      ? fromCategoryPrisma(productPrisma.category)
      : undefined,
    productPrisma.categoryId,
    productPrisma.images.map((img: any) => fromProductImagePrisma(img)),
    productPrisma.variants.map((v: any) => fromProductVariantPrisma(v)),
    productPrisma.stock,
    productPrisma.shop ? fromShopPrisma(productPrisma.shop) : undefined,
    productPrisma.shopId,
    productPrisma.createdAt,
    productPrisma.updatedAt,
    productPrisma.CartItem.map((ci: any) => fromCartItemPrisma(ci)),
    productPrisma.OrderItem.map((oi: any) => fromOrderItemPrisma(oi)),
    productPrisma.Review.map((r: any) => fromReviewPrisma(r)),
    productPrisma.description,
    productPrisma.vendor ? fromVendorPrisma(productPrisma.vendor) : undefined,
    productPrisma.vendorId,
  );
}
