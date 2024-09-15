import { Injectable } from '@nestjs/common';
import { ShopService } from 'src/application/services/shop.service';

/**
 * Use case class for retrieving a sales report for a shop.
 * This class encapsulates the business logic for fetching sales reports.
 */
@Injectable()
export class FetchShopSalesReport {
  constructor(private readonly shopService: ShopService) {}

  /**
   * Execute the fetch-shop-sales-report use case.
   * @param shopId - The ID of the shop.
   * @param startDate - Start of the time range.
   * @param endDate - End of the time range.
   * @returns A promise that resolves to the sales report.
   */
  async execute(shopId: number, startDate: Date, endDate: Date): Promise<any> {
    return this.shopService.getShopSalesReport(shopId, startDate, endDate);
  }
}
