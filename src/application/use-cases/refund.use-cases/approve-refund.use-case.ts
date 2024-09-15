import { Injectable } from '@nestjs/common';
import { toRefundDTO } from 'src/application/helper/to-dto/to.refund.dto';
import { RefundService } from 'src/application/services/refund.service';
import { RefundDTO } from 'src/presentation/dtos/refund.dto';

/**
 * Use case class for approving refunds.
 * This class encapsulates the business logic for approving refunds.
 */
@Injectable()
export class ApproveRefund {
  constructor(private readonly service: RefundService) {}

  /**
   * Execute the approve-refund use case.
   * @param id - The ID of the refund to be approved.
   * @returns A promise that resolves to the approved refund or null if not found.
   */
  async execute(id: number): Promise<RefundDTO | null> {
    const refund = await this.service.approveRefund(id);
    return refund ? toRefundDTO(refund) : null;
  }
}
