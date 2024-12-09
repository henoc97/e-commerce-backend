import { Injectable } from '@nestjs/common';
import { MarketplaceService } from '../../../application/services/marketplace.service';
import { toMarketplaceDTO } from '../../../application/helper/to-dto/to.marketplace.dto';
import { MarketplaceDTO } from '../../../presentation/dtos/marketplace.dto';

/**
 * Use case class for fetching a marketplace by a shop's ID.
 */
@Injectable()
export class FetchMarketplaceByShopId {
  constructor(private readonly service: MarketplaceService) { }

  /**
   * Execute the fetch-marketplace-by-shop-id use case.
   * @param shopId - The ID of the shop.
   * @returns A promise that resolves to the Marketplace DTO if found, otherwise null.
   */
  async execute(shopId: number): Promise<MarketplaceDTO | null> {
    const marketplace = await this.service.getMarketplaceByShopId(shopId);
    if (!marketplace) return null;
    return toMarketplaceDTO(marketplace);
  }
}
