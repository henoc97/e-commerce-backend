import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/application/services/payment.service';
import { PaymentDTO } from 'src/presentation/dtos/payment.dto';
import { toPaymentDTO } from 'src/application/helper/to-dto/to.payment.dto';

/**
 * Use case class for fetching the most recent payment by order ID.
 */
@Injectable()
export class FetchMostRecentPaymentByOrderId {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Execute the fetch-most-recent-payment-by-order-id use case.
   * @param orderId - The unique ID of the order.
   * @returns A promise that resolves to the most recent Payment DTO for the specified order.
   */
  async execute(orderId: number): Promise<PaymentDTO | null> {
    const payment =
      await this.paymentService.getMostRecentPaymentByOrderId(orderId);
    if (!payment) return null;
    return toPaymentDTO(payment);
  }
}
