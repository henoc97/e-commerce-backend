import { MarketplaceDTO } from 'src/presentation/dtos/marketplace.dto';
import { toShopDTO } from './to.shop.dto';

/**
 * Converts a Marketplace entity to MarketplaceDTO.
 * @param marketplace - The Marketplace entity to convert.
 * @returns The corresponding MarketplaceDTO.
 */
export function toMarketplaceDTO(marketplace: any): MarketplaceDTO {
  return new MarketplaceDTO(
    marketplace.name,
    marketplace.description,
    marketplace.shops.map((shop) => toShopDTO(shop)),
    marketplace.id,
  );
}
