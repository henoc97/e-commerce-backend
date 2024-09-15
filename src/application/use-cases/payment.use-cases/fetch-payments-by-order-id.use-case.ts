import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/application/services/payment.service';
import { PaymentDTO } from 'src/presentation/dtos/payment.dto';
import { toPaymentDTO } from 'src/application/helper/to-dto/to.payment.dto';

/**
 * Use case class for fetching payments by order ID.
 */
@Injectable()
export class FetchPaymentsByOrderId {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Execute the fetch-payments-by-order-id use case.
   * @param orderId - The unique ID of the order.
   * @returns A promise that resolves to an array of Payment DTOs for the specified order.
   */
  async execute(orderId: number): Promise<PaymentDTO[]> {
    const payments = await this.paymentService.getPaymentsByOrderId(orderId);
    return payments.map(toPaymentDTO);
  }
}
