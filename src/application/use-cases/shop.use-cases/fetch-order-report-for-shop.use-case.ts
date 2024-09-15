import { Injectable } from '@nestjs/common';
import { ShopService } from 'src/application/services/shop.service';

/**
 * Use case class for retrieving a report of orders for a shop.
 * This class encapsulates the business logic for fetching order reports.
 */
@Injectable()
export class FetchOrderReportForShop {
  constructor(private readonly shopService: ShopService) {}

  /**
   * Execute the fetch-order-report-for-shop use case.
   * @param shopId - The ID of the shop.
   * @param startDate - Start of the time range.
   * @param endDate - End of the time range.
   * @returns A promise that resolves to the order report.
   */
  async execute(shopId: number, startDate: Date, endDate: Date): Promise<any> {
    return this.shopService.getOrderReportForShop(shopId, startDate, endDate);
  }
}
