import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateOrderItem } from 'src/application/use-cases/order-item.use-case/create-order-item.use-case';
import { FetchOrderItemById } from 'src/application/use-cases/order-item.use-case/fetch-order-item-by-id.use-case';
import { DeleteOrderItem } from 'src/application/use-cases/order-item.use-case/delete-order-item.use-case';
import { FetchLowStockItems } from 'src/application/use-cases/order-item.use-case/fetch-low-stock-items.use-case';
import { FetchOrderItemsByOrderId } from 'src/application/use-cases/order-item.use-case/fetch-order-items-by-order-id.use-case';
import { FetchOrderItemsByProductId } from 'src/application/use-cases/order-item.use-case/fetch-order-items-by-product-id.use-case';
import { FetchRecentOrderItems } from 'src/application/use-cases/order-item.use-case/fetch-recent-order-items.use-case';
import { UpdateOrderItem } from 'src/application/use-cases/order-item.use-case/update-order-item.use-case';
import { CalculateTotalPriceForOrder } from 'src/application/use-cases/order-item.use-case/calculate-total-price-for-order.use-case';
import { OrderItemDTO } from 'src/presentation/dtos/order-item.dto';

@Resolver('OrderItem')
export class OrderItemResolver {
  constructor(
    private readonly createOrderItemUseCase: CreateOrderItem,
    private readonly fetchOrderItemById: FetchOrderItemById,
    private readonly deleteOrderItemUseCase: DeleteOrderItem,
    private readonly fetchLowStockItems: FetchLowStockItems,
    private readonly fetchOrderItemsByOrderId: FetchOrderItemsByOrderId,
    private readonly fetchOrderItemsByProductId: FetchOrderItemsByProductId,
    private readonly fetchRecentOrderItems: FetchRecentOrderItems,
    private readonly updateOrderItemUseCase: UpdateOrderItem,
    private readonly calculateTotalPriceForOrder: CalculateTotalPriceForOrder,
  ) {}

  @Mutation(() => OrderItemDTO, { nullable: true })
  async createOrderItem(
    @Args('orderItemDTO') orderItemDTO: OrderItemDTO,
  ): Promise<OrderItemDTO | null> {
    return await this.createOrderItemUseCase.execute(orderItemDTO);
  }

  @Query(() => OrderItemDTO, { nullable: true })
  async orderItemById(@Args('id') id: number): Promise<OrderItemDTO | null> {
    return await this.fetchOrderItemById.execute(id);
  }

  @Mutation(() => Boolean)
  async deleteOrderItem(@Args('id') id: number): Promise<boolean> {
    return await this.deleteOrderItemUseCase.execute(id);
  }

  @Query(() => [OrderItemDTO])
  async lowStockItems(
    @Args('threshold') threshold: number,
  ): Promise<OrderItemDTO[]> {
    return await this.fetchLowStockItems.execute(threshold);
  }

  @Query(() => [OrderItemDTO])
  async orderItemsByOrderId(
    @Args('orderId') orderId: number,
  ): Promise<OrderItemDTO[]> {
    return await this.fetchOrderItemsByOrderId.execute(orderId);
  }

  @Query(() => [OrderItemDTO])
  async orderItemsByProductId(
    @Args('productId') productId: number,
  ): Promise<OrderItemDTO[]> {
    return await this.fetchOrderItemsByProductId.execute(productId);
  }

  @Query(() => [OrderItemDTO])
  async recentOrderItems(
    @Args('orderId') orderId: number,
  ): Promise<OrderItemDTO[]> {
    return await this.fetchRecentOrderItems.execute(orderId);
  }

  @Mutation(() => OrderItemDTO, { nullable: true })
  async updateOrderItem(
    @Args('id') id: number,
    @Args('updates') updates: Partial<OrderItemDTO>,
  ): Promise<OrderItemDTO | null> {
    return await this.updateOrderItemUseCase.execute(id, updates);
  }

  @Query(() => Number)
  async totalPriceForOrder(@Args('orderId') orderId: number): Promise<number> {
    return await this.calculateTotalPriceForOrder.execute(orderId);
  }
}
