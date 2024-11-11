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
    @Args('paymentDTO') paymentDTO: PaymentDTO,
  ): Promise<PaymentDTO | null> {
    return this.createPaymentUseCase.execute(paymentDTO);
  }

  @Mutation(() => Boolean)
  async deletePayment(@Args('id') id: number): Promise<boolean> {
    return this.deletePaymentUseCase.execute(id);
  }

  @Query(() => PaymentDTO, { nullable: true })
  async fetchMostRecentPaymentByOrderId(
    @Args('orderId') orderId: number,
  ): Promise<PaymentDTO | null> {
    return this.fetchMostRecentPaymentByOrderIdUseCase.execute(orderId);
  }

  @Query(() => PaymentDTO, { nullable: true })
  async fetchPaymentById(@Args('id') id: number): Promise<PaymentDTO | null> {
    return this.fetchPaymentByIdUseCase.execute(id);
  }

  @Query(() => [PaymentDTO])
  async fetchPaymentsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<PaymentDTO[]> {
    return this.fetchPaymentsByDateRangeUseCase.execute(startDate, endDate);
  }

  @Query(() => [PaymentDTO])
  async fetchPaymentsByMethod(
    @Args('method') method: string,
  ): Promise<PaymentDTO[]> {
    return this.fetchPaymentsByMethodUseCase.execute(method);
  }

  @Query(() => [PaymentDTO])
  async fetchPaymentsByOrderId(
    @Args('orderId') orderId: number,
  ): Promise<PaymentDTO[]> {
    return this.fetchPaymentsByOrderIdUseCase.execute(orderId);
  }

  @Query(() => [PaymentDTO])
  async fetchPaymentsByStatus(
    @Args('status') status: PaymentStatus,
  ): Promise<PaymentDTO[]> {
    return this.fetchPaymentsByStatusUseCase.execute(status);
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
    @Args('updates') updates: PaymentDTO,
  ): Promise<PaymentDTO | null> {
    return this.updatePaymentUseCase.execute(id, updates);
  }
}
