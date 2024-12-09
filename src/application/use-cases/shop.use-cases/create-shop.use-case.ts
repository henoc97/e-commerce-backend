import { Injectable } from '@nestjs/common';
import { toShopDTO } from '../../../application/helper/to-dto/to.shop.dto';
import { ShopService } from '../../../application/services/shop.service';
import { ShopDTO } from '../../../presentation/dtos/shop.dto';

/**
 * Use case class for creating a new shop.
 * This class encapsulates the business logic for creating shops.
 */
@Injectable()
export class CreateShop {
  constructor(private readonly shopService: ShopService) { }

  /**
   * Execute the create-shop use case.
   * @param shopDTO - The ShopDTO containing the shop data to be created.
   * @returns A promise that resolves to the created Shop DTO.
   */
  async execute(shopDTO: ShopDTO): Promise<ShopDTO | null> {
    const createdShop = await this.shopService.createShop(shopDTO);

    if (!createdShop) return null;

    return toShopDTO(createdShop);
  }
}
