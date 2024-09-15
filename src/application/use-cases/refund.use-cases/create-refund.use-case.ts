import { Injectable } from '@nestjs/common';
import { toRefundDTO } from 'src/application/helper/to-dto/to.refund.dto';
import { RefundService } from 'src/application/services/refund.service';
import { RefundDTO } from 'src/presentation/dtos/refund.dto';

/**
 * Use case class for creating refunds.
 * This class encapsulates the business logic for creating a new refund.
 */
@Injectable()
export class CreateRefund {
  constructor(private readonly service: RefundService) {}

  /**
   * Execute the create-refund use case.
   * @param refundDTO - The refund data to be created.
   * @returns A promise that resolves to the created refund or null if creation failed.
   */
  async execute(refundDTO: RefundDTO): Promise<RefundDTO | null> {
    const refund = await this.service.createRefund(refundDTO);
    return refund ? toRefundDTO(refund) : null;
  }
}
