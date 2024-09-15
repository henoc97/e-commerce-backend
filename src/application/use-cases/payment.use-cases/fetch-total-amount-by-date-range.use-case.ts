import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/application/services/payment.service';

/**
 * Use case class for fetching the total amount of payments by date range.
 */
@Injectable()
export class FetchTotalAmountByDateRange {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Execute the fetch-total-amount-by-date-range use case.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to the total amount of payments within the specified date range.
   */
  async execute(startDate: Date, endDate: Date): Promise<number> {
    return this.paymentService.getTotalAmountByDateRange(startDate, endDate);
  }
}
