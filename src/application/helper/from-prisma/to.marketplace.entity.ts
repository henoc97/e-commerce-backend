import { Marketplace } from '../../../domain/entities/marketplace.entity';
import { fromShopPrisma } from './to.shop.entity';

/**
 * Converts a MarketplacePrisma to a Marketplace entity.
 * @param marketplacePrisma - The MarketplacePrisma to convert.

* @returns The corresponding Marketplace entity.
 */
export function fromMarketplacePrisma(marketplacePrisma: any): Marketplace {
  return new Marketplace(
    marketplacePrisma.id,
    marketplacePrisma.name,
    marketplacePrisma.description,
    marketplacePrisma.shops?.map((shop) => fromShopPrisma(shop)),
  );
}
