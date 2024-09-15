import { Injectable } from '@nestjs/common';
import { RefundService } from 'src/application/services/refund.service';
import { RefundDTO } from 'src/presentation/dtos/refund.dto';

/**
 * Use case class for checking refund eligibility.
 * This class encapsulates the business logic for checking if a refund is eligible.
 */
@Injectable()
export class CheckRefundEligibility {
  constructor(private readonly service: RefundService) {}

  /**
   * Execute the check-refund-eligibility use case.
   * @param refund - The refund to check for eligibility.
   * @returns A boolean indicating if the refund is eligible.
   */
  async execute(refund: RefundDTO): Promise<boolean> {
    return this.service.isRefundEligible(refund);
  }
}
