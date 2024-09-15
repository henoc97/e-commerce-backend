import { Injectable } from '@nestjs/common';
import { toShopDTO } from 'src/application/helper/to-dto/to.shop.dto';
import { ShopService } from 'src/application/services/shop.service';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';

/**
 * Use case class for retrieving a list of shops.
 * This class encapsulates the business logic for fetching a list of shops.
 */
@Injectable()
export class FetchShopList {
  constructor(private readonly shopService: ShopService) {}

  /**
   * Execute the fetch-shop-list use case.
   * @returns A promise that resolves to an array of Shop DTOs.
   */
  async execute(): Promise<ShopDTO[]> {
    const shops = await this.shopService.getShopList();
    return shops.map(toShopDTO);
  }
}
