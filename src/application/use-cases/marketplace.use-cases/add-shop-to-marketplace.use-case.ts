import { Injectable } from '@nestjs/common';
import { MarketplaceService } from 'src/application/services/marketplace.service';
import { MarketplaceDTO } from 'src/presentation/dtos/marketplace.dto';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';
import { toMarketplaceDTO } from 'src/application/helper/to-dto/to.marketplace.dto';

/**
 * Use case class for adding a shop to a marketplace.
 */
@Injectable()
export class AddShopToMarketplace {
  constructor(private readonly service: MarketplaceService) {}

  /**
   * Execute the add-shop-to-marketplace use case.
   * @param marketplaceId - The ID of the marketplace.
   * @param shopDTO - The DTO containing the shop data to add.
   * @returns A promise that resolves to the updated Marketplace DTO.
   */
  async execute(
    marketplaceId: number,
    shopDTO: ShopDTO,
  ): Promise<MarketplaceDTO | null> {
    const marketplace = await this.service.addShopToMarketplace(
      marketplaceId,
      shopDTO,
    );
    if (!marketplace) return null;
    return toMarketplaceDTO(marketplace);
  }
}
