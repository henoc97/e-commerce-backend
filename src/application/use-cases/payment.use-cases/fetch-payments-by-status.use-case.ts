import { Injectable } from '@nestjs/common';
import { PaymentService } from '../../../application/services/payment.service';
import { PaymentDTO } from '../../../presentation/dtos/payment.dto';
import { PaymentStatus } from '../../../domain/enums/payment-status.enum';
import { toPaymentDTO } from '../../../application/helper/to-dto/to.payment.dto';

/**
 * Use case class for fetching payments by status.
 */
@Injectable()
export class FetchPaymentsByStatus {
  constructor(private readonly paymentService: PaymentService) { }

  /**
   * Execute the fetch-payments-by-status use case.
   * @param status - The status of payments to retrieve (e.g., SUCCESS, FAILED).
   * @returns A promise that resolves to an array of Payment DTOs with the specified status.
   */
  async execute(status: PaymentStatus): Promise<PaymentDTO[]> {
    const payments = await this.paymentService.getPaymentsByStatus(status);
    return payments?.map(toPaymentDTO);
  }
}
