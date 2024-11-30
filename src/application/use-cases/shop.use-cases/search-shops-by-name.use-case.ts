import { Injectable } from '@nestjs/common';
import { ShopService } from 'src/application/services/shop.service';
import { ShopDTO } from 'src/presentation/dtos/shop.dto';
import { toShopDTO } from 'src/application/helper/to-dto/to.shop.dto';

/**
 * Use case class for searching shops by name.
 * This class encapsulates the logic to search for shops that match a specific name.
 */
@Injectable()
export class SearchShopsByName {
  constructor(private readonly shopService: ShopService) { }

  /**
   * Execute the search-shops-by-name use case.
   * @param name - The name of the shop to search for.
   * @returns A promise that resolves to an array of ShopDTO objects matching the name.
   */
  async execute(name: string): Promise<ShopDTO[]> {
    const shops = await this.shopService.searchShopsByName(name);
    return shops?.map(toShopDTO);
  }
}
