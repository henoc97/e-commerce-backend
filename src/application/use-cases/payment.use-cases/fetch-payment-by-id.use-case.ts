import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/application/services/payment.service';
import { PaymentDTO } from 'src/presentation/dtos/payment.dto';
import { toPaymentDTO } from 'src/application/helper/to-dto/to.payment.dto';

/**
 * Use case class for fetching a payment by ID.
 */
@Injectable()
export class FetchPaymentById {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Execute the fetch-payment-by-id use case.
   * @param id - The unique ID of the payment.
   * @returns A promise that resolves to the Payment DTO if found, otherwise null.
   */
  async execute(id: number): Promise<PaymentDTO | null> {
    const payment = await this.paymentService.getPaymentById(id);
    if (!payment) return null;
    return toPaymentDTO(payment);
  }
}
