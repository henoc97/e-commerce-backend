import { Injectable } from '@nestjs/common';
import { ShopService } from '../../../application/services/shop.service';

/**
 * Use case class for retrieving a revenue report for a shop.
 * This class encapsulates the business logic for fetching revenue reports.
 */
@Injectable()
export class FetchShopRevenueReport {
    constructor(private readonly shopService: ShopService) { }

    /**
     * Execute the fetch-shop-revenue-report use case.
     * @param shopId - The ID of the shop.
     * @param startDate - Start of the time range.
     * @param endDate - End of the time range.
     * @returns A promise that resolves to the revenue report.
     */
    async execute(shopId: number, startDate: Date, endDate: Date): Promise<any> {
        // return this.shopService.getShopRevenueReport(shopId, startDate, endDate);
        return {};
    }
}
