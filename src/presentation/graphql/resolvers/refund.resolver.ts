import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ApproveRefund } from 'src/application/use-cases/refund.use-cases/approve-refund.use-case';
import { CancelRefund } from 'src/application/use-cases/refund.use-cases/cancel-refund.use-case';
import { CheckRefundEligibility } from 'src/application/use-cases/refund.use-cases/check-refund-eligibility.use-case';
import { CreateRefund } from 'src/application/use-cases/refund.use-cases/create-refund.use-case';
import { DeleteRefund } from 'src/application/use-cases/refund.use-cases/delete-refund.use-case';
import { FetchRefundById } from 'src/application/use-cases/refund.use-cases/fetch-refund-by-id.use-case';
import { FetchRefundsByOrder } from 'src/application/use-cases/refund.use-cases/fetch-refunds-by-order.use-case';
import { FetchRefundsByStatus } from 'src/application/use-cases/refund.use-cases/fetch-refunds-by-status.use-case';
import { FetchTotalRefundedAmount } from 'src/application/use-cases/refund.use-cases/fetch-total-refunded-amount.use-case';
import { IssuePartialRefund } from 'src/application/use-cases/refund.use-cases/issue-partial-refund.use-case';
import { ProcessRefund } from 'src/application/use-cases/refund.use-cases/process-refund.use-case';
import { UpdateRefund } from 'src/application/use-cases/refund.use-cases/update-refund.use-case';
import { RefundDTO } from 'src/presentation/dtos/refund.dto';
import { RefundStatus } from 'src/domain/enums/refund-status.enum';

@Resolver()
export class RefundResolver {
  constructor(
    private readonly approveRefundUseCase: ApproveRefund,
    private readonly cancelRefundUseCase: CancelRefund,
    private readonly checkRefundEligibilityUseCase: CheckRefundEligibility,
    private readonly createRefundUseCase: CreateRefund,
    private readonly deleteRefundUseCase: DeleteRefund,
    private readonly fetchRefundByIdUseCase: FetchRefundById,
    private readonly fetchRefundsByOrderUseCase: FetchRefundsByOrder,
    private readonly fetchRefundsByStatusUseCase: FetchRefundsByStatus,
    private readonly fetchTotalRefundedAmountUseCase: FetchTotalRefundedAmount,
    private readonly issuePartialRefundUseCase: IssuePartialRefund,
    private readonly processRefundUseCase: ProcessRefund,
    private readonly updateRefundUseCase: UpdateRefund,
  ) { }

  @Mutation(() => RefundDTO, { nullable: true })
  async approveRefund(@Args('id') id: number): Promise<RefundDTO | null> {
    return this.approveRefundUseCase.execute(id);
  }

  @Mutation(() => RefundDTO, { nullable: true })
  async cancelRefund(@Args('id') id: number): Promise<RefundDTO | null> {
    return this.cancelRefundUseCase.execute(id);
  }

  @Query(() => Boolean)
  async checkRefundEligibility(
    @Args('refund') refund: RefundDTO,
  ): Promise<boolean> {
    return this.checkRefundEligibilityUseCase.execute(refund);
  }

  @Mutation(() => RefundDTO, { nullable: true })
  async createRefund(
    @Args('refundDTO') refundDTO: RefundDTO,
  ): Promise<RefundDTO | null> {
    return this.createRefundUseCase.execute(refundDTO);
  }

  @Mutation(() => Boolean)
  async deleteRefund(@Args('id') id: number): Promise<boolean> {
    return this.deleteRefundUseCase.execute(id);
  }

  @Query(() => RefundDTO, { nullable: true })
  async fetchRefundById(@Args('id') id: number): Promise<RefundDTO | null> {
    return this.fetchRefundByIdUseCase.execute(id);
  }

  @Query(() => [RefundDTO])
  async fetchRefundsByOrder(
    @Args('orderId') orderId: number,
  ): Promise<RefundDTO[]> {
    return this.fetchRefundsByOrderUseCase.execute(orderId);
  }

  @Query(() => [RefundDTO])
  async fetchRefundsByStatus(
    @Args('status') status: RefundStatus,
  ): Promise<RefundDTO[]> {
    return this.fetchRefundsByStatusUseCase.execute(status);
  }

  @Query(() => Number)
  async fetchTotalRefundedAmount(
    @Args('orderId') orderId: number,
  ): Promise<number> {
    return this.fetchTotalRefundedAmountUseCase.execute(orderId);
  }

  @Mutation(() => RefundDTO)
  async issuePartialRefund(
    @Args('id') id: number,
    @Args('amount') amount: number,
  ): Promise<RefundDTO> {
    return this.issuePartialRefundUseCase.execute(id, amount);
  }

  @Mutation(() => RefundDTO)
  async processRefund(
    @Args('id') id: number,
    @Args('status') status: RefundStatus,
  ): Promise<RefundDTO> {
    return this.processRefundUseCase.execute(id, status);
  }

  @Mutation(() => RefundDTO)
  async updateRefund(
    @Args('id') id: number,
    @Args('updates') updates: RefundDTO,
  ): Promise<RefundDTO> {
    return this.updateRefundUseCase.execute(id, updates);
  }
}
