import { Injectable } from '@nestjs/common';
import { ShopService } from 'src/application/services/shop.service';

/**
 * Use case for fetching total sales of a shop.
 * It retrieves the total sales amount for a given shop.
 */
@Injectable()
export class FetchTotalSalesForShop {
  constructor(private readonly shopService: ShopService) {}

  /**
   * Executes the fetch-total-sales-for-shop use case.
   * @param shopId - The ID of the shop to fetch total sales.
   * @returns A promise that resolves to the total sales amount.
   */
  async execute(shopId: number): Promise<number> {
    return this.shopService.getTotalSalesForShop(shopId);
  }
}
