import { Injectable } from '@nestjs/common';
import { toShopDTO } from 'src/application/helper/to-dto/to.shop.dto';
import { ShopService } from 'src/application/services/shop.service';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';

/**
 * Use case class for retrieving the most recently updated shop.
 * This class encapsulates the business logic for fetching the most recent shop.
 */
@Injectable()
export class FetchMostRecentShop {
  constructor(private readonly shopService: ShopService) {}

  /**
   * Execute the fetch-most-recent-shop use case.
   * @returns A promise that resolves to the most recently updated Shop DTO or null.
   */
  async execute(): Promise<ShopDTO | null> {
    const shop = await this.shopService.getMostRecentShop();

    if (!shop) return null;

    return toShopDTO(shop);
  }
}
