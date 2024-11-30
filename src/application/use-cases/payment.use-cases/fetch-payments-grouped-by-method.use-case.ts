import { Injectable } from '@nestjs/common';
import { PaymentService } from 'src/application/services/payment.service';
import { PaymentDTO } from 'src/presentation/dtos/payment.dto';
import { toPaymentDTO } from 'src/application/helper/to-dto/to.payment.dto';

/**
 * Use case class for fetching payments grouped by payment method.
 */
@Injectable()
export class FetchPaymentsGroupedByMethod {
  constructor(private readonly paymentService: PaymentService) { }

  /**
   * Execute the fetch-payments-grouped-by-method use case.
   * @returns A promise that resolves to a map of payment methods to arrays of Payment DTOs.
   */
  async execute(): Promise<Map<string, PaymentDTO[]>> {
    const paymentsGrouped =
      await this.paymentService.getPaymentsGroupedByMethod();
    const result = new Map<string, PaymentDTO[]>();

    paymentsGrouped.forEach((payments, method) => {
      result.set(method, payments?.map(toPaymentDTO));
    });

    return result;
  }
}
