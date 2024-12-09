import { Injectable } from '@nestjs/common';
import { MarketplaceService } from '../../../application/services/marketplace.service';
import { MarketplaceDTO } from '../../../presentation/dtos/marketplace.dto';
import { ShopDTO } from '../../../presentation/dtos/shop.dto';
import { toMarketplaceDTO } from '../../../application/helper/to-dto/to.marketplace.dto';

/**
 * Use case class for adding a shop to a marketplace.
 */
@Injectable()
export class AddShopToMarketplace {
  constructor(private readonly service: MarketplaceService) { }

  /**
   * Execute the add-shop-to-marketplace use case.
   * @param marketplaceId - The ID of the marketplace.
   * @param shopId - The ID of the shop to add.
   * @returns A promise that resolves to the updated Marketplace DTO.
   */
  async execute(
    marketplaceId: number,
    shopId: number,
  ): Promise<MarketplaceDTO | null> {
    const marketplace = await this.service.addShopToMarketplace(
      marketplaceId,
      shopId,
    );
    if (!marketplace) return null;
    return toMarketplaceDTO(marketplace);
  }
}
