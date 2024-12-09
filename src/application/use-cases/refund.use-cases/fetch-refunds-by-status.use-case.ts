import { Injectable } from '@nestjs/common';
import { RefundService } from '../../../application/services/refund.service';
import { RefundDTO } from '../../../presentation/dtos/refund.dto';
import { RefundStatus } from '../../../domain/enums/refund-status.enum';
import { toRefundDTO } from '../../../application/helper/to-dto/to.refund.dto';

/**
 * Use case class for fetching refunds by status.
 * This class encapsulates the business logic for retrieving refunds with a specific status.
 */
@Injectable()
export class FetchRefundsByStatus {
  constructor(private readonly service: RefundService) { }

  /**
   * Execute the fetch-refunds-by-status use case.
   * @param status - The status to filter refunds by.
   * @returns A promise that resolves to a list of refund DTOs.
   */
  async execute(status: RefundStatus): Promise<RefundDTO[]> {
    const refunds = await this.service.getRefundsByStatus(status);
    return refunds?.map(toRefundDTO);
  }
}
