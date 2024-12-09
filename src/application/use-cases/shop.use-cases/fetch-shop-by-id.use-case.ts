import { Injectable } from '@nestjs/common';
import { toShopDTO } from '../../../application/helper/to-dto/to.shop.dto';
import { ShopService } from '../../../application/services/shop.service';
import { ShopDTO } from '../../../presentation/dtos/shop.dto';

/**
 * Use case class for retrieving a shop by its ID.
 * This class encapsulates the business logic for fetching a shop by ID.
 */
@Injectable()
export class FetchShopById {
  constructor(private readonly shopService: ShopService) { }

  /**
   * Execute the fetch-shop-by-id use case.
   * @param id - The ID of the shop to be fetched.
   * @returns A promise that resolves to the Shop DTO or null if not found.
   */
  async execute(id: number): Promise<ShopDTO | null> {
    const shop = await this.shopService.getShopById(id);

    if (!shop) return null;

    return toShopDTO(shop);
  }
}
