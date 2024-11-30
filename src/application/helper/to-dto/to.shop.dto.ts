import { Shop } from 'src/domain/entities/shop.entity';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';
import { toCategoryDTO } from './to.category.dto';
import { toOrderDTO } from './to.order.dto';
import { toVendorDTO } from './to.vendor.dto';
import { toProductDTO } from './to.product.dto';
import { toMarketplaceDTO } from './to.marketplace.dto';

/**
 * Converts a Shop entity to a ShopDTO.
 * @param shop - The Shop entity to convert.
 * @returns The corresponding ShopDTO.
 */
export function toShopDTO(shop: any): ShopDTO {
  return new ShopDTO(
    shop.id,
    shop.name,
    shop.url,
    shop.vendor ? toVendorDTO(shop.vendor) : undefined,
    shop.vendorId,
    shop.products?.map((product) => toProductDTO(product)),
    shop.orders?.map((order) => toOrderDTO(order)),
    shop.categories?.map((category) => toCategoryDTO(category)),
    shop.createdAt,
    shop.updatedAt,
    shop.description,
    shop.Marketplace ? toMarketplaceDTO(shop.Marketplace) : undefined,
    shop.marketplaceId,
  );
}
