import { Injectable } from '@nestjs/common';
import { toRefundDTO } from 'src/application/helper/to-dto/to.refund.dto';
import { RefundService } from 'src/application/services/refund.service';
import { RefundDTO } from 'src/presentation/dtos/refund.dto';

/**
 * Use case class for cancelling refunds.
 * This class encapsulates the business logic for cancelling refunds.
 */
@Injectable()
export class CancelRefund {
  constructor(private readonly service: RefundService) {}

  /**
   * Execute the cancel-refund use case.
   * @param id - The ID of the refund to be cancelled.
   * @returns A promise that resolves to the cancelled refund or null if not found.
   */
  async execute(id: number): Promise<RefundDTO | null> {
    const refund = await this.service.cancelRefund(id);
    return refund ? toRefundDTO(refund) : null;
  }
}
