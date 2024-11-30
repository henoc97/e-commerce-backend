import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/application/services/payment.service';
import { PaymentDTO } from 'src/presentation/dtos/payment.dto';
import { toPaymentDTO } from 'src/application/helper/to-dto/to.payment.dto';

/**
 * Use case class for fetching payments by payment method.
 */
@Injectable()
export class FetchPaymentsByMethod {
  constructor(private readonly paymentService: PaymentService) { }

  /**
   * Execute the fetch-payments-by-method use case.
   * @param method - The payment method used (e.g., Stripe, PayPal).
   * @returns A promise that resolves to an array of Payment DTOs for the specified method.
   */
  async execute(method: string): Promise<PaymentDTO[]> {
    const payments = await this.paymentService.getPaymentsByMethod(method);
    return payments?.map(toPaymentDTO);
  }
}
