import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/application/services/payment.service';
import { PaymentDTO } from 'src/presentation/dtos/payment.dto';
import { toPaymentDTO } from 'src/application/helper/to-dto/to.payment.dto';

/**
 * Use case class for creating payments.
 */
@Injectable()
export class CreatePayment {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Execute the create-payment use case.
   * @param paymentDTO - The PaymentDTO containing the payment data.
   * @returns A promise that resolves to the created Payment DTO.
   */
  async execute(paymentDTO: PaymentDTO): Promise<PaymentDTO | null> {
    const payment = await this.paymentService.createPayment(paymentDTO);
    if (!payment) return null;
    return toPaymentDTO(payment);
  }
}
