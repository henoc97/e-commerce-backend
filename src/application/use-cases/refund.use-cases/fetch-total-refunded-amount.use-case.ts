import { Injectable } from '@nestjs/common';
import { RefundService } from '../../../application/services/refund.service';

/**
 * Use case class for fetching the total refunded amount by order ID.
 * This class encapsulates the business logic for calculating the total refunded amount for an order.
 */
@Injectable()
export class FetchTotalRefundedAmount {
  constructor(private readonly service: RefundService) { }

  /**
   * Execute the fetch-total-refunded-amount use case.
   * @param orderId - The ID of the order to calculate the total refunded amount for.
   * @returns A promise that resolves to the total refunded amount.
   */
  async execute(orderId: number): Promise<number> {
    return this.service.getTotalRefundedAmount(orderId);
  }
}
