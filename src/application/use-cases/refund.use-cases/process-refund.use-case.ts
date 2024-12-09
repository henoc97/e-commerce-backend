import { Injectable } from '@nestjs/common';
import { RefundService } from '../../../application/services/refund.service';
import { RefundDTO } from '../../../presentation/dtos/refund.dto';
import { RefundStatus } from '../../../domain/enums/refund-status.enum';
import { toRefundDTO } from '../../../application/helper/to-dto/to.refund.dto';

/**
 * Use case class for processing a refund.
 * This class encapsulates the business logic for updating the status of a refund.
 */
@Injectable()
export class ProcessRefund {
  constructor(private readonly service: RefundService) { }

  /**
   * Execute the process-refund use case.
   * @param id - The ID of the refund to process.
   * @param status - The new status of the refund.
   * @returns A promise that resolves to the updated refund DTO.
   */
  async execute(id: number, status: RefundStatus): Promise<RefundDTO> {
    const refund = await this.service.processRefund(id, status);
    return toRefundDTO(refund);
  }
}
