import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/application/services/order.service';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { toOrderDTO } from 'src/application/helper/to-dto/to.order.dto';

/**
 * Use case for fetching orders by shop ID.
 */
@Injectable()
export class FetchOrdersByShopId {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Retrieves all orders for a specific shop.
   * @param shopId - The unique ID of the shop.
   * @returns A promise that resolves to an array of Order DTOs for the shop.
   */
  async execute(shopId: number): Promise<OrderDTO[]> {
    const orders = await this.orderService.getOrdersByShopId(shopId);
    return orders.map(toOrderDTO);
  }
}
