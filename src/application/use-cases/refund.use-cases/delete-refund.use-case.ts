import { Injectable } from '@nestjs/common';
import { RefundService } from '../../../application/services/refund.service';

/**
 * Use case class for deleting refunds.
 * This class encapsulates the business logic for deleting a refund.
 */
@Injectable()
export class DeleteRefund {
  constructor(private readonly service: RefundService) { }

  /**
   * Execute the delete-refund use case.
   * @param id - The ID of the refund to be deleted.
   * @returns A promise that resolves to a boolean indicating if the deletion was successful.
   */
  async execute(id: number): Promise<boolean> {
    return this.service.deleteRefund(id);
  }
}
