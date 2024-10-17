import { Shop } from 'src/domain/entities/shop.entity';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';
import { fromMarketplaceDTO } from './to.marketplace.entity';
import { fromVendorDTO } from './to.vendor.entity';
import { fromOrderDTO } from './to.order.entity';
import { fromProductDTO } from './to.product.entity';
import { fromCategoryDTO } from './to.category.entity';

/**
 * Converts a ShopDTO to a Shop entity.
 * @param shopDTO - The ShopDTO to convert.
 * @returns The corresponding Shop entity.
 */
export function fromShopDTO(shopDTO: ShopDTO | Partial<ShopDTO>): Shop {
  return new Shop(
    shopDTO.id,
    shopDTO.name,
    shopDTO.url,
    shopDTO.vendorId,
    shopDTO.products.map((productDTO) => fromProductDTO(productDTO)),
    shopDTO.orders.map((orderDTO) => fromOrderDTO(orderDTO)),
    shopDTO.categories.map((categoryDTO) => fromCategoryDTO(categoryDTO)),
    shopDTO.createdAt,
    shopDTO.updatedAt,
    shopDTO.vendor ? fromVendorDTO(shopDTO.vendor) : undefined,
    shopDTO.description,
    shopDTO.marketplaceId,
    shopDTO.Marketplace ? fromMarketplaceDTO(shopDTO.Marketplace) : undefined,
  );
}
