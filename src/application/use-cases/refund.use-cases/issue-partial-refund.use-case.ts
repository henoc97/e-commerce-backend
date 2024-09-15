import { Injectable } from '@nestjs/common';
import { toRefundDTO } from 'src/application/helper/to-dto/to.refund.dto';
import { RefundService } from 'src/application/services/refund.service';
import { RefundDTO } from 'src/presentation/dtos/refund.dto';

/**
 * Use case class for issuing a partial refund.
 * This class encapsulates the business logic for issuing a partial refund for a specific refund ID.
 */
@Injectable()
export class IssuePartialRefund {
  constructor(private readonly service: RefundService) {}

  /**
   * Execute the issue-partial-refund use case.
   * @param id - The ID of the refund to partially refund.
   * @param amount - The amount to be refunded partially.
   * @returns A promise that resolves to the updated refund DTO.
   */
  async execute(id: number, amount: number): Promise<RefundDTO> {
    const refund = await this.service.issuePartialRefund(id, amount);
    return toRefundDTO(refund);
  }
}
