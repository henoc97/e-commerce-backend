import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentDTO } from '../../../presentation/dtos/payment.dto';
import { CreatePayment } from '../../../application/use-cases/payment.use-cases/create-payment.use-case';
import { DeletePayment } from '../../../application/use-cases/payment.use-cases/delete-payment.use-case';
import { FetchMostRecentPaymentByOrderId } from '../../../application/use-cases/payment.use-cases/fetch-most-recent-payment-by-order-id.use-case';
import { FetchPaymentById } from '../../../application/use-cases/payment.use-cases/fetch-payment-by-id.use-case';
import { FetchPaymentsByDateRange } from '../../../application/use-cases/payment.use-cases/fetch-payments-by-date-range.use-case';
import { FetchPaymentsByMethod } from '../../../application/use-cases/payment.use-cases/fetch-payments-by-method.use-case';
import { FetchPaymentsByOrderId } from '../../../application/use-cases/payment.use-cases/fetch-payments-by-order-id.use-case';
import { FetchPaymentsByStatus } from '../../../application/use-cases/payment.use-cases/fetch-payments-by-status.use-case';
import { FetchPaymentsGroupedByMethod } from '../../../application/use-cases/payment.use-cases/fetch-payments-grouped-by-method.use-case';
import { FetchTotalAmountByDateRange } from '../../../application/use-cases/payment.use-cases/fetch-total-amount-by-date-range.use-case';
import { UpdatePayment } from '../../../application/use-cases/payment.use-cases/update-payment.use-case';
import { PaymentStatus } from '../../../domain/enums/payment-status.enum';
import { transformPaymentDTOToGraphQL } from '../../../application/helper/utils/transformers';
import { toPaymentDTO } from '../../../application/helper/to-dto/to.payment.dto';
import { PaymentOutput } from '../../../presentation/output/payment.output';
import { PaymentInput } from '../../../presentation/input/payment.input';


@Resolver(() => PaymentOutput)
export class PaymentResolver {
  constructor(
    private readonly createPaymentUseCase: CreatePayment,
    private readonly deletePaymentUseCase: DeletePayment,
    private readonly fetchMostRecentPaymentByOrderIdUseCase: FetchMostRecentPaymentByOrderId,
    private readonly fetchPaymentByIdUseCase: FetchPaymentById,
    private readonly fetchPaymentsByDateRangeUseCase: FetchPaymentsByDateRange,
    private readonly fetchPaymentsByMethodUseCase: FetchPaymentsByMethod,
    private readonly fetchPaymentsByOrderIdUseCase: FetchPaymentsByOrderId,
    private readonly fetchPaymentsByStatusUseCase: FetchPaymentsByStatus,
    private readonly fetchPaymentsGroupedByMethodUseCase: FetchPaymentsGroupedByMethod,
    private readonly fetchTotalAmountByDateRangeUseCase: FetchTotalAmountByDateRange,
    private readonly updatePaymentUseCase: UpdatePayment,
  ) { }

  @Mutation(() => PaymentOutput)
  async createPayment(
    @Args('paymentInput') payment: PaymentInput,
  ): Promise<PaymentOutput | null> {
    const dto = toPaymentDTO(payment);
    const result = await this.createPaymentUseCase.execute(dto);
    return transformPaymentDTOToGraphQL(result);
  }

  @Mutation(() => Boolean)
  async deletePayment(@Args('id') id: number): Promise<boolean> {
    return this.deletePaymentUseCase.execute(id);
  }

  @Query(() => PaymentOutput, { nullable: true })
  async fetchMostRecentPaymentByOrderId(
    @Args('orderId') orderId: number,
  ): Promise<PaymentOutput | null> {
    const result = await this.fetchMostRecentPaymentByOrderIdUseCase.execute(orderId);
    return transformPaymentDTOToGraphQL(result);
  }

  @Query(() => PaymentOutput, { nullable: true })
  async fetchPaymentById(@Args('id') id: number): Promise<PaymentOutput | null> {
    const result = await this.fetchPaymentByIdUseCase.execute(id);
    return transformPaymentDTOToGraphQL(result);
  }

  @Query(() => [PaymentOutput])
  async fetchPaymentsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<PaymentOutput[]> {
    const result = await this.fetchPaymentsByDateRangeUseCase.execute(startDate, endDate);
    return result?.map(transformPaymentDTOToGraphQL);
  }

  @Query(() => [PaymentOutput])
  async fetchPaymentsByMethod(
    @Args('method') method: string,
  ): Promise<PaymentOutput[]> {
    const result = await this.fetchPaymentsByMethodUseCase.execute(method);
    return result?.map(transformPaymentDTOToGraphQL);
  }

  @Query(() => [PaymentOutput])
  async fetchPaymentsByOrderId(
    @Args('orderId') orderId: number,
  ): Promise<PaymentOutput[]> {
    const result = await this.fetchPaymentsByOrderIdUseCase.execute(orderId);
    return result?.map(transformPaymentDTOToGraphQL);
  }

  @Query(() => [PaymentOutput])
  async fetchPaymentsByStatus(
    @Args('status') status: PaymentStatus,
  ): Promise<PaymentOutput[]> {
    const result = await this.fetchPaymentsByStatusUseCase.execute(status);
    return result?.map(transformPaymentDTOToGraphQL);
  }

  @Query(() => String)
  async fetchPaymentsGroupedByMethod(): Promise<Map<string, PaymentOutput[]>> {
    return this.fetchPaymentsGroupedByMethodUseCase.execute();
  }

  @Query(() => Number)
  async fetchTotalAmountByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<number> {
    return this.fetchTotalAmountByDateRangeUseCase.execute(startDate, endDate);
  }

  @Mutation(() => PaymentOutput, { nullable: true })
  async updatePayment(
    @Args('id') id: number,
    @Args('updates') updates: PaymentInput,
  ): Promise<PaymentOutput | null> {
    const dto = toPaymentDTO(updates);
    const result = await this.updatePaymentUseCase.execute(id, dto);
    return transformPaymentDTOToGraphQL(result);
  }
}
