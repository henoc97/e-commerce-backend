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
import { toOrderItemDTO } from 'src/application/helper/to-dto/to.order-item.dto';
import { transformOrderItemDTOToGraphQL } from 'src/application/helper/utils/transformers';
import { OrderItemInput } from 'src/presentation/input/order-item.input';
import { OrderItemOutput } from 'src/presentation/output/order-item.output';

@Resolver(() => OrderItemOutput)
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
  ) { }

  @Mutation(() => OrderItemOutput, { nullable: true })
  async createOrderItem(
    @Args('orderItem') orderItem: OrderItemInput,
  ): Promise<OrderItemOutput | null> {
    const dto = toOrderItemDTO(orderItem);
    const result = await this.createOrderItemUseCase.execute(dto);
    return transformOrderItemDTOToGraphQL(result);
  }

  @Query(() => OrderItemOutput, { nullable: true })
  async orderItemById(@Args('id') id: number): Promise<OrderItemOutput | null> {
    const result = await this.fetchOrderItemById.execute(id);
    return transformOrderItemDTOToGraphQL(result);
  }

  @Mutation(() => Boolean)
  async deleteOrderItem(@Args('id') id: number): Promise<boolean> {
    return await this.deleteOrderItemUseCase.execute(id);
  }

  @Query(() => [OrderItemOutput])
  async lowStockItems(
    @Args('threshold') threshold: number,
  ): Promise<OrderItemOutput[]> {
    const result = await this.fetchLowStockItems.execute(threshold);
    return result.map(transformOrderItemDTOToGraphQL);
  }

  @Query(() => [OrderItemOutput])
  async orderItemsByOrderId(
    @Args('orderId') orderId: number,
  ): Promise<OrderItemOutput[]> {
    const result = await this.fetchOrderItemsByOrderId.execute(orderId);
    return result.map(transformOrderItemDTOToGraphQL);
  }

  @Query(() => [OrderItemOutput])
  async orderItemsByProductId(
    @Args('productId') productId: number,
  ): Promise<OrderItemOutput[]> {
    const result = await this.fetchOrderItemsByProductId.execute(productId);
    return result.map(transformOrderItemDTOToGraphQL);
  }

  @Query(() => [OrderItemOutput])
  async recentOrderItems(
    @Args('orderId') orderId: number,
  ): Promise<OrderItemOutput[]> {
    const result = await this.fetchRecentOrderItems.execute(orderId);
    return result.map(transformOrderItemDTOToGraphQL);
  }

  @Mutation(() => OrderItemOutput, { nullable: true })
  async updateOrderItem(
    @Args('id') id: number,
    @Args('updates') updates: OrderItemInput,
  ): Promise<OrderItemOutput | null> {
    // const dto = toOrderItemDTO(updates)
    const result = await this.updateOrderItemUseCase.execute(id, updates);
    return transformOrderItemDTOToGraphQL(result);
  }

  @Query(() => Number)
  async totalPriceForOrder(@Args('orderId') orderId: number): Promise<number> {
    return await this.calculateTotalPriceForOrder.execute(orderId);
  }
}
