import { Injectable } from '@nestjs/common';
import { toShopDTO } from '../../../application/helper/to-dto/to.shop.dto';
import { ShopService } from '../../../application/services/shop.service';
import { ShopDTO } from '../../../presentation/dtos/shop.dto';

/**
 * Use case class for associating a marketplace with a shop.
 * This class encapsulates the business logic for associating a marketplace.
 */
@Injectable()
export class AssociateMarketplaceWithShop {
  constructor(private readonly shopService: ShopService) { }

  /**
   * Execute the associate-marketplace-with-shop use case.
   * @param shopId - The ID of the shop.
   * @param marketplaceId - The ID of the marketplace to be associated.
   * @returns A promise that resolves to the updated Shop DTO.
   */
  async execute(
    shopId: number,
    marketplaceId: number,
  ): Promise<ShopDTO | null> {
    const updatedShop = await this.shopService.associateMarketplaceWithShop(
      shopId,
      marketplaceId,
    );

    if (!updatedShop) return null;

    return toShopDTO(updatedShop);
  }
}
