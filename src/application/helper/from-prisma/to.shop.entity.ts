import { Shop } from 'src/domain/entities/shop.entity';
import { fromMarketplacePrisma } from './to.marketplace.entity';
import { fromVendorPrisma } from './to.vendor.entity';
import { fromCategoryPrisma } from './to.category.entity';
import { fromProductPrisma } from './to.product.entity';
import { fromOrderPrisma } from './to.order.entity';

/**
 * Converts a ShopPrisma to a Shop entity.
 * @param shopPrisma - The ShopPrisma to convert.
 * @returns The corresponding Shop entity.
 */
export function fromShopPrisma(shopPrisma: any): Shop {
  return new Shop(
    shopPrisma.id,
    shopPrisma.name,
    shopPrisma.url,
    shopPrisma.vendorId,
    shopPrisma.vendor ? fromVendorPrisma(shopPrisma.vendor) : undefined,
    shopPrisma.products.map((productPrisma: any) =>
      fromProductPrisma(productPrisma),
    ),
    shopPrisma.orders.map((orderPrisma: any) => fromOrderPrisma(orderPrisma)),
    shopPrisma.categories.map((categoryPrisma: any) =>
      fromCategoryPrisma(categoryPrisma),
    ),
    shopPrisma.createdAt,
    shopPrisma.updatedAt,
    shopPrisma.description,
    shopPrisma.marketplaceId,
    shopPrisma.Marketplace
      ? fromMarketplacePrisma(shopPrisma.Marketplace)
      : undefined,
  );
}
