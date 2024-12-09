import { Module } from '@nestjs/common';
import { RefundService } from '../services/refund.service';
import { RefundRepository } from '../../infrastructure/persistences/refund.repository.impl';
import { CreateRefund } from '../use-cases/refund.use-cases/create-refund.use-case';
import { CancelRefund } from '../use-cases/refund.use-cases/cancel-refund.use-case';
import { ApproveRefund } from '../use-cases/refund.use-cases/approve-refund.use-case';
import { UpdateRefund } from '../use-cases/refund.use-cases/update-refund.use-case';
import { ProcessRefund } from '../use-cases/refund.use-cases/process-refund.use-case';
import { DeleteRefund } from '../use-cases/refund.use-cases/delete-refund.use-case';
import { FetchRefundById } from '../use-cases/refund.use-cases/fetch-refund-by-id.use-case';
import { FetchRefundsByOrder } from '../use-cases/refund.use-cases/fetch-refunds-by-order.use-case';
import { FetchRefundsByStatus } from '../use-cases/refund.use-cases/fetch-refunds-by-status.use-case';
import { CheckRefundEligibility } from '../use-cases/refund.use-cases/check-refund-eligibility.use-case';
import { IssuePartialRefund } from '../use-cases/refund.use-cases/issue-partial-refund.use-case';
import { FetchTotalRefundedAmount } from '../use-cases/refund.use-cases/fetch-total-refunded-amount.use-case';

const refundUseCases = [
  CreateRefund,
  CancelRefund,
  ApproveRefund,
  UpdateRefund,
  ProcessRefund,
  DeleteRefund,
  FetchRefundById,
  FetchRefundsByOrder,
  FetchRefundsByStatus,
  CheckRefundEligibility,
  IssuePartialRefund,
  FetchTotalRefundedAmount,
];

@Module({
  providers: [
    RefundService,

    {
      provide: 'IRefundRepository',
      useClass: RefundRepository,
    },
    ...refundUseCases,
  ],
  exports: [RefundService, ...refundUseCases],
})
export class RefundModule { }
