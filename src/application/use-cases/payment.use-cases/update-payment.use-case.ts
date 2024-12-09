import { Injectable } from '@nestjs/common';
import { PaymentService } from '../../../application/services/payment.service';
import { PaymentDTO } from '../../../presentation/dtos/payment.dto';
import { toPaymentDTO } from '../../../application/helper/to-dto/to.payment.dto';

/**
 * Use case class for updating payments.
 */
@Injectable()
export class UpdatePayment {
  constructor(private readonly paymentService: PaymentService) { }

  /**
   * Execute the update-payment use case.
   * @param id - The unique ID of the payment to update.
   * @param updates - The data to update.
   * @returns A promise that resolves to the updated Payment DTO.
   */
  async execute(
    id: number,
    updates: Partial<PaymentDTO>,
  ): Promise<PaymentDTO | null> {
    const updatedPayment = await this.paymentService.updatePayment(id, updates);
    if (!updatedPayment) return null;
    return toPaymentDTO(updatedPayment);
  }
}
