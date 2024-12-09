import { Injectable } from '@nestjs/common';
import { ShopService } from '../../../application/services/shop.service';
import { ShopDTO } from '../../../presentation/dtos/shop.dto';
import { toShopDTO } from '../../../application/helper/to-dto/to.shop.dto';

/**
 * Use case class for updating an existing shop.
 * This class encapsulates the business logic to update shop details.
 */
@Injectable()
export class UpdateShop {
  constructor(private readonly shopService: ShopService) { }

  /**
   * Execute the update-shop use case.
   * @param shopId - The ID of the shop to update.
   * @param updates - Partial updates for the shop.
   * @returns A promise that resolves to the updated ShopDTO.
   */
  async execute(shopId: number, updates: Partial<ShopDTO>): Promise<ShopDTO> {
    const updatedShop = await this.shopService.updateShop(shopId, updates);
    return toShopDTO(updatedShop);
  }
}
