import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/application/services/payment.service';

/**
 * Use case class for deleting payments.
 */
@Injectable()
export class DeletePayment {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Execute the delete-payment use case.
   * @param id - The unique ID of the payment to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async execute(id: number): Promise<boolean> {
    return this.paymentService.deletePayment(id);
  }
}
