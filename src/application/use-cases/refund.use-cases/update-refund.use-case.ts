import { Injectable } from '@nestjs/common';
import { toRefundDTO } from '../../../application/helper/to-dto/to.refund.dto';
import { RefundService } from '../../../application/services/refund.service';
import { RefundDTO } from '../../../presentation/dtos/refund.dto';

/**
 * Use case class for updating refund details.
 * This class encapsulates the business logic for updating a refund's details.
 */
@Injectable()
export class UpdateRefund {
  constructor(private readonly service: RefundService) { }

  /**
   * Execute the update-refund use case.
   * @param id - The ID of the refund to update.
   * @param updates - The fields to update in the refund.
   * @returns A promise that resolves to the updated refund DTO.
   */
  async execute(id: number, updates: Partial<RefundDTO>): Promise<RefundDTO> {
    const refund = await this.service.updateRefund(id, updates);
    return toRefundDTO(refund);
  }
}
