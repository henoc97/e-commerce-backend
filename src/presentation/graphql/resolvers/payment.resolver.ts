import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentDTO } from 'src/presentation/dtos/payment.dto';
import { CreatePayment } from 'src/application/use-cases/payment.use-cases/create-payment.use-case';
import { DeletePayment } from 'src/application/use-cases/payment.use-cases/delete-payment.use-case';
import { FetchMostRecentPaymentByOrderId } from 'src/application/use-cases/payment.use-cases/fetch-most-recent-payment-by-order-id.use-case';
import { FetchPaymentById } from 'src/application/use-cases/payment.use-cases/fetch-payment-by-id.use-case';
import { FetchPaymentsByDateRange } from 'src/application/use-cases/payment.use-cases/fetch-payments-by-date-range.use-case';
import { FetchPaymentsByMethod } from 'src/application/use-cases/payment.use-cases/fetch-payments-by-method.use-case';
import { FetchPaymentsByOrderId } from 'src/application/use-cases/payment.use-cases/fetch-payments-by-order-id.use-case';
import { FetchPaymentsByStatus } from 'src/application/use-cases/payment.use-cases/fetch-payments-by-status.use-case';
import { FetchPaymentsGroupedByMethod } from 'src/application/use-cases/payment.use-cases/fetch-payments-grouped-by-method.use-case';
import { FetchTotalAmountByDateRange } from 'src/application/use-cases/payment.use-cases/fetch-total-amount-by-date-range.use-case';
import { UpdatePayment } from 'src/application/use-cases/payment.use-cases/update-payment.use-case';
import { PaymentStatus } from 'src/domain/enums/payment-status.enum';
import { PaymentInput, Payment } from 'src/generated/graphql';
import { transformPaymentDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { toPaymentDTO } from 'src/application/helper/to-dto/to.payment.dto';


@Resolver(() => PaymentDTO)
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

  @Mutation(() => PaymentDTO)
  async createPayment(
    @Args('paymentInput') payment: PaymentInput,
  ): Promise<Payment | null> {
    const dto = toPaymentDTO(payment);
    const result = await this.createPaymentUseCase.execute(dto);
    return transformPaymentDTOToGraphQL(result);
  }

  @Mutation(() => Boolean)
  async deletePayment(@Args('id') id: number): Promise<boolean> {
    return this.deletePaymentUseCase.execute(id);
  }

  @Query(() => PaymentDTO, { nullable: true })
  async fetchMostRecentPaymentByOrderId(
    @Args('orderId') orderId: number,
  ): Promise<Payment | null> {
    const result = await this.fetchMostRecentPaymentByOrderIdUseCase.execute(orderId);
    return transformPaymentDTOToGraphQL(result);
  }

  @Query(() => PaymentDTO, { nullable: true })
  async fetchPaymentById(@Args('id') id: number): Promise<Payment | null> {
    const result = await this.fetchPaymentByIdUseCase.execute(id);
    return transformPaymentDTOToGraphQL(result);
  }

  @Query(() => [PaymentDTO])
  async fetchPaymentsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<Payment[]> {
    const result = await this.fetchPaymentsByDateRangeUseCase.execute(startDate, endDate);
    return result.map(transformPaymentDTOToGraphQL);
  }

  @Query(() => [PaymentDTO])
  async fetchPaymentsByMethod(
    @Args('method') method: string,
  ): Promise<Payment[]> {
    const result = await this.fetchPaymentsByMethodUseCase.execute(method);
    return result.map(transformPaymentDTOToGraphQL);
  }

  @Query(() => [PaymentDTO])
  async fetchPaymentsByOrderId(
    @Args('orderId') orderId: number,
  ): Promise<Payment[]> {
    const result = await this.fetchPaymentsByOrderIdUseCase.execute(orderId);
    return result.map(transformPaymentDTOToGraphQL);
  }

  @Query(() => [PaymentDTO])
  async fetchPaymentsByStatus(
    @Args('status') status: PaymentStatus,
  ): Promise<Payment[]> {
    const result = await this.fetchPaymentsByStatusUseCase.execute(status);
    return result.map(transformPaymentDTOToGraphQL);
  }

  @Query(() => Map)
  async fetchPaymentsGroupedByMethod(): Promise<Map<string, PaymentDTO[]>> {
    return this.fetchPaymentsGroupedByMethodUseCase.execute();
  }

  @Query(() => Number)
  async fetchTotalAmountByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<number> {
    return this.fetchTotalAmountByDateRangeUseCase.execute(startDate, endDate);
  }

  @Mutation(() => PaymentDTO, { nullable: true })
  async updatePayment(
    @Args('id') id: number,
    @Args('updates') updates: PaymentInput,
  ): Promise<Payment | null> {
    const dto = toPaymentDTO(updates);
    const result = await this.updatePaymentUseCase.execute(id, dto);
    return transformPaymentDTOToGraphQL(result);
  }
}
