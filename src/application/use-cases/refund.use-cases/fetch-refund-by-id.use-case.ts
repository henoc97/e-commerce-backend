import { Injectable } from '@nestjs/common';
import { toRefundDTO } from '../../../application/helper/to-dto/to.refund.dto';
import { RefundService } from '../../../application/services/refund.service';
import { RefundDTO } from '../../../presentation/dtos/refund.dto';

/**
 * Use case class for fetching a refund by its ID.
 * This class encapsulates the business logic for retrieving a specific refund.
 */
@Injectable()
export class FetchRefundById {
  constructor(private readonly service: RefundService) { }

  /**
   * Execute the fetch-refund-by-id use case.
   * @param id - The ID of the refund to be retrieved.
   * @returns A promise that resolves to the refund DTO or null if not found.
   */
  async execute(id: number): Promise<RefundDTO | null> {
    const refund = await this.service.getRefundById(id);
    return refund ? toRefundDTO(refund) : null;
  }
}
