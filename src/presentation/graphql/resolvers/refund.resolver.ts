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
import { transformRefundDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { RefundOutput } from 'src/presentation/output/refund.output';
import { toRefundDTO } from 'src/application/helper/to-dto/to.refund.dto';
import { RefundInput } from 'src/presentation/input/refund.input';

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

  @Mutation(() => RefundOutput, { nullable: true })
  async approveRefund(@Args('id') id: number): Promise<RefundOutput | null> {
    const result = await this.approveRefundUseCase.execute(id);
    return transformRefundDTOToGraphQL(result);
  }

  @Mutation(() => RefundOutput, { nullable: true })
  async cancelRefund(@Args('id') id: number): Promise<RefundOutput | null> {
    const result = await this.cancelRefundUseCase.execute(id);
    return transformRefundDTOToGraphQL(result);
  }

  @Query(() => Boolean)
  async checkRefundEligibility(
    @Args('refund') refund: RefundInput,
  ): Promise<boolean> {
    const dto = toRefundDTO(refund)
    return this.checkRefundEligibilityUseCase.execute(dto);
  }

  @Mutation(() => RefundOutput, { nullable: true })
  async createRefund(
    @Args('refund') refund: RefundInput,
  ): Promise<RefundOutput | null> {
    const dto = toRefundDTO(refund)
    const result = await this.createRefundUseCase.execute(dto);
    return transformRefundDTOToGraphQL(result);
  }

  @Mutation(() => Boolean)
  async deleteRefund(@Args('id') id: number): Promise<boolean> {
    return this.deleteRefundUseCase.execute(id);
  }

  @Query(() => RefundOutput, { nullable: true })
  async fetchRefundById(@Args('id') id: number): Promise<RefundOutput | null> {
    const result = await this.fetchRefundByIdUseCase.execute(id);
    return transformRefundDTOToGraphQL(result);
  }

  @Query(() => [RefundOutput])
  async fetchRefundsByOrder(
    @Args('orderId') orderId: number,
  ): Promise<RefundOutput[]> {
    const result = await this.fetchRefundsByOrderUseCase.execute(orderId);
    return result.map(transformRefundDTOToGraphQL);
  }

  @Query(() => [RefundOutput])
  async fetchRefundsByStatus(
    @Args('status') status: RefundStatus,
  ): Promise<RefundOutput[]> {
    const result = await this.fetchRefundsByStatusUseCase.execute(status);
    return result.map(transformRefundDTOToGraphQL);
  }

  @Query(() => Number)
  async fetchTotalRefundedAmount(
    @Args('orderId') orderId: number,
  ): Promise<number> {
    return this.fetchTotalRefundedAmountUseCase.execute(orderId);
  }

  @Mutation(() => RefundOutput)
  async issuePartialRefund(
    @Args('id') id: number,
    @Args('amount') amount: number,
  ): Promise<RefundOutput> {
    const result = await this.issuePartialRefundUseCase.execute(id, amount);
    return transformRefundDTOToGraphQL(result);
  }

  @Mutation(() => RefundOutput)
  async processRefund(
    @Args('id') id: number,
    @Args('status') status: RefundStatus,
  ): Promise<RefundOutput> {
    const result = await this.processRefundUseCase.execute(id, status);
    return transformRefundDTOToGraphQL(result);
  }

  @Mutation(() => RefundOutput)
  async updateRefund(
    @Args('id') id: number,
    @Args('updates') updates: RefundInput,
  ): Promise<RefundOutput> {
    const dto = toRefundDTO(updates)
    const result = await this.updateRefundUseCase.execute(id, dto);
    return transformRefundDTOToGraphQL(result);
  }
}
