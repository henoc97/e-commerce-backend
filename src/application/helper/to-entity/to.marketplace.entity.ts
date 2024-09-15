import { Marketplace } from 'src/domain/entities/marketplace.entity';
import { MarketplaceDTO } from 'src/presentation/dtos/marketplace.dto';
import { fromShopDTO } from './to.shop.entity';

/**
 * Converts a MarketplaceDTO to a Marketplace entity.
 * @param marketplaceDTO - The MarketplaceDTO to convert.

* @returns The corresponding Marketplace entity.
 */
export function fromMarketplaceDTO(
  marketplaceDTO: MarketplaceDTO | Partial<MarketplaceDTO>,
): Marketplace {
  return new Marketplace(
    marketplaceDTO.id,
    marketplaceDTO.name,
    marketplaceDTO.description,
    marketplaceDTO.shops.map((shop) => fromShopDTO(shop)),
  );
}
