import { Injectable } from '@nestjs/common';
import { toShopDTO } from 'src/application/helper/to-dto/to.shop.dto';
import { ShopService } from 'src/application/services/shop.service';
import { MarketplaceDTO } from 'src/presentation/dtos/marketplace.dto';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';

/**
 * Use case class for associating a marketplace with a shop.
 * This class encapsulates the business logic for associating a marketplace.
 */
@Injectable()
export class AssociateMarketplaceWithShop {
  constructor(private readonly shopService: ShopService) {}

  /**
   * Execute the associate-marketplace-with-shop use case.
   * @param shopId - The ID of the shop.
   * @param marketplaceDTO - The MarketplaceDTO containing the marketplace data to be associated.
   * @returns A promise that resolves to the updated Shop DTO.
   */
  async execute(
    shopId: number,
    marketplaceDTO: MarketplaceDTO,
  ): Promise<ShopDTO | null> {
    const updatedShop = await this.shopService.associateMarketplaceWithShop(
      shopId,
      marketplaceDTO,
    );

    if (!updatedShop) return null;

    return toShopDTO(updatedShop);
  }
}
