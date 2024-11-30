import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/application/services/payment.service';
import { PaymentDTO } from 'src/presentation/dtos/payment.dto';
import { toPaymentDTO } from 'src/application/helper/to-dto/to.payment.dto';

/**
 * Use case class for fetching payments by date range.
 */
@Injectable()
export class FetchPaymentsByDateRange {
  constructor(private readonly paymentService: PaymentService) { }

  /**
   * Execute the fetch-payments-by-date-range use case.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to an array of Payment DTOs within the specified date range.
   */
  async execute(startDate: Date, endDate: Date): Promise<PaymentDTO[]> {
    const payments = await this.paymentService.getPaymentsByDateRange(
      startDate,
      endDate,
    );
    return payments?.map(toPaymentDTO);
  }
}
