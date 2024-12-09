import { Injectable } from '@nestjs/common';
import { MarketplaceService } from '../../../application/services/marketplace.service';
import { toShopDTO } from '../../../application/helper/to-dto/to.shop.dto';
import { ShopDTO } from '../../../presentation/dtos/shop.dto';

/**
 * Use case class for fetching all shops in a marketplace.
 */
@Injectable()
export class FetchShopsInMarketplace {
  constructor(private readonly service: MarketplaceService) { }

  /**
   * Execute the fetch-shops-in-marketplace use case.
   * @param marketplaceId - The ID of the marketplace.
   * @returns A promise that resolves to an array of ShopDTOs.
   */
  async execute(marketplaceId: number): Promise<ShopDTO[]> {
    const shops = await this.service.getShopsInMarketplace(marketplaceId);
    return shops?.map(toShopDTO);
  }
}
