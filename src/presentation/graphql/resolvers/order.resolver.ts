import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddPaymentToOrder } from 'src/application/use-cases/order.use-cases/add-payment-to-order.use-case';
import { AddRefundToOrder } from 'src/application/use-cases/order.use-cases/add-refund-to-order.use-case';
import { CreateOrder } from 'src/application/use-cases/order.use-cases/create-order.use-case';
import { DeleteOrder } from 'src/application/use-cases/order.use-cases/delete-order.use-case';
import { FetchOrderById } from 'src/application/use-cases/order.use-cases/fetch-order-by-id.use-case';
import { FetchOrderByTrackingNumber } from 'src/application/use-cases/order.use-cases/fetch-order-by-tracking-number.use-case';
import { FetchOrdersByDateRange } from 'src/application/use-cases/order.use-cases/fetch-orders-by-date-range.use-case';
import { FetchOrdersByShopId } from 'src/application/use-cases/order.use-cases/fetch-orders-by-shop-id.use-case';
import { FetchOrdersByStatus } from 'src/application/use-cases/order.use-cases/fetch-orders-by-status.use-case';
import { FetchOrdersByUserId } from 'src/application/use-cases/order.use-cases/fetch-orders-by-user-id.use-case';
import { FetchOrders } from 'src/application/use-cases/order.use-cases/fetch-orders.use-case';
import { FetchRecentOrdersByShop } from 'src/application/use-cases/order.use-cases/fetch-recent-orders-by-shop.use-case';
import { FetchTopOrdersByAmount } from 'src/application/use-cases/order.use-cases/fetch-top-orders-by-amount.use-case';
import { UpdateOrderStatus } from 'src/application/use-cases/order.use-cases/update-order-status.use-case';
import { UpdateOrder } from 'src/application/use-cases/order.use-cases/update-order.use-case';
import { OrderStatus } from 'src/domain/enums/order-status.enum';
import { OrderDTO } from 'src/presentation/dtos/order.dto';

@Resolver(() => OrderDTO)
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

  @Query(() => OrderDTO, { nullable: true })
  async getOrderById(@Args('id') id: number): Promise<OrderDTO | null> {
    return this.fetchOrderByIdUseCase.execute(id);
  }

  @Query(() => [OrderDTO])
  async getOrders(): Promise<OrderDTO[]> {
    return this.fetchOrdersUseCase.execute();
  }

  @Mutation(() => OrderDTO)
  async createOrder(
    @Args('orderDTO') orderDTO: OrderDTO,
  ): Promise<OrderDTO | null> {
    return this.createOrderUseCase.execute(orderDTO);
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Args('id') id: number): Promise<boolean> {
    return this.deleteOrderUseCase.execute(id);
  }

  @Mutation(() => OrderDTO, { nullable: true })
  async updateOrderStatus(
    @Args('orderId') orderId: number,
    @Args('status') status: OrderStatus,
  ): Promise<OrderDTO | null> {
    return this.updateOrderStatusUseCase.execute(orderId, status);
  }

  @Mutation(() => OrderDTO, { nullable: true })
  async addPaymentToOrder(
    @Args('orderId') orderId: number,
    @Args('paymentId') paymentId: string,
  ): Promise<OrderDTO | null> {
    return this.addPaymentToOrderUseCase.execute(orderId, paymentId);
  }

  @Mutation(() => OrderDTO, { nullable: true })
  async addRefundToOrder(
    @Args('orderId') orderId: number,
    @Args('refundId') refundId: string,
  ): Promise<OrderDTO | null> {
    return this.addRefundToOrderUseCase.execute(orderId, refundId);
  }

  @Query(() => OrderDTO, { nullable: true })
  async getOrderByTrackingNumber(
    @Args('trackingNumber') trackingNumber: string,
  ): Promise<OrderDTO | null> {
    return this.fetchOrderByTrackingNumberUseCase.execute(trackingNumber);
  }

  @Query(() => [OrderDTO])
  async getOrdersByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<OrderDTO[]> {
    return this.fetchOrdersByDateRangeUseCase.execute(startDate, endDate);
  }

  @Query(() => [OrderDTO])
  async getOrdersByShopId(@Args('shopId') shopId: number): Promise<OrderDTO[]> {
    return this.fetchOrdersByShopIdUseCase.execute(shopId);
  }

  @Query(() => [OrderDTO])
  async getOrdersByStatus(
    @Args('status') status: OrderStatus,
  ): Promise<OrderDTO[]> {
    return this.fetchOrdersByStatusUseCase.execute(status);
  }

  @Query(() => [OrderDTO])
  async getOrdersByUserId(@Args('userId') userId: number): Promise<OrderDTO[]> {
    return this.fetchOrdersByUserIdUseCase.execute(userId);
  }

  @Query(() => [OrderDTO])
  async getRecentOrdersByShop(
    @Args('shopId') shopId: number,
    @Args('limit') limit: number,
  ): Promise<OrderDTO[]> {
    return this.fetchRecentOrdersByShopUseCase.execute(shopId, limit);
  }

  @Query(() => [OrderDTO])
  async getTopOrdersByAmount(@Args('topN') topN: number): Promise<OrderDTO[]> {
    return this.fetchTopOrdersByAmountUseCase.execute(topN);
  }

  @Mutation(() => OrderDTO)
  async updateOrder(
    @Args('orderId') orderId: number,
    @Args('updates') updates: OrderDTO,
  ): Promise<OrderDTO> {
    return this.updateOrderUseCase.execute(orderId, updates);
  }
}
