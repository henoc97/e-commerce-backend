import { Injectable } from '@nestjs/common';
import { toRefundDTO } from 'src/application/helper/to-dto/to.refund.dto';
import { RefundService } from 'src/application/services/refund.service';
import { RefundDTO } from 'src/presentation/dtos/refund.dto';

/**
 * Use case class for fetching refunds by order ID.
 * This class encapsulates the business logic for retrieving refunds related to a specific order.
 */
@Injectable()
export class FetchRefundsByOrder {
  constructor(private readonly service: RefundService) {}

  /**
   * Execute the fetch-refunds-by-order use case.
   * @param orderId - The ID of the order to fetch refunds for.
   * @returns A promise that resolves to a list of refund DTOs.
   */
  async execute(orderId: number): Promise<RefundDTO[]> {
    const refunds = await this.service.getRefundsByOrder(orderId);
    return refunds.map(toRefundDTO);
  }
}
