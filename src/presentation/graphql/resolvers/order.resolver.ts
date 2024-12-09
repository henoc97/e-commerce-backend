import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddPaymentToOrder } from '../../../application/use-cases/order.use-cases/add-payment-to-order.use-case';
import { AddRefundToOrder } from '../../../application/use-cases/order.use-cases/add-refund-to-order.use-case';
import { CreateOrder } from '../../../application/use-cases/order.use-cases/create-order.use-case';
import { DeleteOrder } from '../../../application/use-cases/order.use-cases/delete-order.use-case';
import { FetchOrderById } from '../../../application/use-cases/order.use-cases/fetch-order-by-id.use-case';
import { FetchOrderByTrackingNumber } from '../../../application/use-cases/order.use-cases/fetch-order-by-tracking-number.use-case';
import { FetchOrdersByDateRange } from '../../../application/use-cases/order.use-cases/fetch-orders-by-date-range.use-case';
import { FetchOrdersByShopId } from '../../../application/use-cases/order.use-cases/fetch-orders-by-shop-id.use-case';
import { FetchOrdersByStatus } from '../../../application/use-cases/order.use-cases/fetch-orders-by-status.use-case';
import { FetchOrdersByUserId } from '../../../application/use-cases/order.use-cases/fetch-orders-by-user-id.use-case';
import { FetchOrders } from '../../../application/use-cases/order.use-cases/fetch-orders.use-case';
import { FetchRecentOrdersByShop } from '../../../application/use-cases/order.use-cases/fetch-recent-orders-by-shop.use-case';
import { FetchTopOrdersByAmount } from '../../../application/use-cases/order.use-cases/fetch-top-orders-by-amount.use-case';
import { UpdateOrderStatus } from '../../../application/use-cases/order.use-cases/update-order-status.use-case';
import { UpdateOrder } from '../../../application/use-cases/order.use-cases/update-order.use-case';
import { OrderStatus } from '../../../domain/enums/order-status.enum';
import { OrderDTO } from '../../../presentation/dtos/order.dto';
import { transformOrderDTOToGraphQL } from '../../../application/helper/utils/transformers';
import { OrderOutput } from '../../../presentation/output/order.output';
import { OrderInput } from '../../../presentation/input/order.input';


@Resolver(() => OrderOutput)
export class OrderResolver {
  constructor(
    private readonly addPaymentToOrderUseCase: AddPaymentToOrder,
    private readonly addRefundToOrderUseCase: AddRefundToOrder,
    private readonly createOrderUseCase: CreateOrder,
    private readonly deleteOrderUseCase: DeleteOrder,
    private readonly fetchOrderByIdUseCase: FetchOrderById,
    private readonly fetchOrderByTrackingNumberUseCase: FetchOrderByTrackingNumber,
    private readonly fetchOrdersByDateRangeUseCase: FetchOrdersByDateRange,
    private readonly fetchOrdersByShopIdUseCase: FetchOrdersByShopId,
    private readonly fetchOrdersByStatusUseCase: FetchOrdersByStatus,
    private readonly fetchOrdersByUserIdUseCase: FetchOrdersByUserId,
    private readonly fetchOrdersUseCase: FetchOrders,
    private readonly fetchRecentOrdersByShopUseCase: FetchRecentOrdersByShop,
    private readonly fetchTopOrdersByAmountUseCase: FetchTopOrdersByAmount,
    private readonly updateOrderStatusUseCase: UpdateOrderStatus,
    private readonly updateOrderUseCase: UpdateOrder,
  ) { }

  @Query(() => OrderOutput, { nullable: true })
  async getOrderById(@Args('id') id: number): Promise<OrderOutput | null> {
    const result = await this.fetchOrderByIdUseCase.execute(id);
    return transformOrderDTOToGraphQL(result);
  }

  @Query(() => [OrderOutput])
  async getOrders(): Promise<OrderOutput[]> {
    const result = await this.fetchOrdersUseCase.execute();
    return result?.map(transformOrderDTOToGraphQL);
  }

  @Mutation(() => OrderOutput)
  async createOrder(
    @Args('order') order: OrderInput,
  ): Promise<OrderOutput | null> {
    const result = await this.createOrderUseCase.execute(order);
    return transformOrderDTOToGraphQL(result);
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Args('id') id: number): Promise<boolean> {
    return this.deleteOrderUseCase.execute(id);
  }

  @Mutation(() => OrderOutput, { nullable: true })
  async updateOrderStatus(
    @Args('orderId') orderId: number,
    @Args('status') status: OrderStatus,
  ): Promise<OrderOutput | null> {
    const result = await this.updateOrderStatusUseCase.execute(orderId, status);
    return transformOrderDTOToGraphQL(result);
  }

  @Mutation(() => OrderOutput, { nullable: true })
  async addPaymentToOrder(
    @Args('orderId') orderId: number,
    @Args('paymentId') paymentId: string,
  ): Promise<OrderOutput | null> {
    const result = await this.addPaymentToOrderUseCase.execute(orderId, paymentId);
    return transformOrderDTOToGraphQL(result);
  }

  @Mutation(() => OrderOutput, { nullable: true })
  async addRefundToOrder(
    @Args('orderId') orderId: number,
    @Args('refundId') refundId: string,
  ): Promise<OrderOutput | null> {
    const result = await this.addRefundToOrderUseCase.execute(orderId, refundId);
    return transformOrderDTOToGraphQL(result);
  }

  @Query(() => OrderOutput, { nullable: true })
  async getOrderByTrackingNumber(
    @Args('trackingNumber') trackingNumber: string,
  ): Promise<OrderOutput | null> {
    const result = await this.fetchOrderByTrackingNumberUseCase.execute(trackingNumber);
    return transformOrderDTOToGraphQL(result);
  }

  @Query(() => [OrderOutput])
  async getOrdersByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<OrderOutput[]> {
    const result = await this.fetchOrdersByDateRangeUseCase.execute(startDate, endDate);
    return result?.map(transformOrderDTOToGraphQL);
  }

  @Query(() => [OrderOutput])
  async getOrdersByShopId(@Args('shopId') shopId: number): Promise<OrderOutput[]> {
    const result = await this.fetchOrdersByShopIdUseCase.execute(shopId);
    return result?.map(transformOrderDTOToGraphQL);
  }

  @Query(() => [OrderOutput])
  async getOrdersByStatus(
    @Args('status') status: OrderStatus,
  ): Promise<OrderOutput[]> {
    const result = await this.fetchOrdersByStatusUseCase.execute(status);
    return result?.map(transformOrderDTOToGraphQL);
  }

  @Query(() => [OrderOutput])
  async getOrdersByUserId(@Args('userId') userId: number): Promise<OrderOutput[]> {
    const result = await this.fetchOrdersByUserIdUseCase.execute(userId);
    return result?.map(transformOrderDTOToGraphQL);
  }

  @Query(() => [OrderOutput])
  async getRecentOrdersByShop(
    @Args('shopId') shopId: number,
    @Args('limit') limit: number,
  ): Promise<OrderOutput[]> {
    const result = await this.fetchRecentOrdersByShopUseCase.execute(shopId, limit);
    return result?.map(transformOrderDTOToGraphQL);;
  }

  @Query(() => [OrderOutput])
  async getTopOrdersByAmount(@Args('topN') topN: number): Promise<OrderOutput[]> {
    const result = await this.fetchTopOrdersByAmountUseCase.execute(topN);
    return result?.map(transformOrderDTOToGraphQL);
  }

  @Mutation(() => OrderOutput)
  async updateOrder(
    @Args('orderId') orderId: number,
    @Args('updates') updates: OrderInput,
  ): Promise<OrderOutput> {
    const result = await this.updateOrderUseCase.execute(orderId, updates);
    return transformOrderDTOToGraphQL(result);
  }
}
