import { Injectable } from '@nestjs/common';
import { MarketplaceService } from 'src/application/services/marketplace.service';
import { toMarketplaceDTO } from 'src/application/helper/to-dto/to.marketplace.dto';
import { MarketplaceDTO } from 'src/presentation/dtos/marketplace.dto';

/**
 * Use case class for removing a shop from a marketplace.
 */
@Injectable()
export class RemoveShopFromMarketplace {
  constructor(private readonly service: MarketplaceService) {}

  /**
   * Execute the remove-shop-from-marketplace use case.
   * @param marketplaceId - The ID of the marketplace.
   * @param shopId - The ID of the shop to remove.
   * @returns A promise that resolves to the updated MarketplaceDTO.
   */
  async execute(
    marketplaceId: number,
    shopId: number,
  ): Promise<MarketplaceDTO | null> {
    const marketplace = await this.service.removeShopFromMarketplace(
      marketplaceId,
      shopId,
    );
    if (!marketplace) return null;
    return toMarketplaceDTO(marketplace);
  }
}
