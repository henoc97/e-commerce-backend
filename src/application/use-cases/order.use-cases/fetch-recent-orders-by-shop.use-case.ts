import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/application/services/order.service';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { toOrderDTO } from 'src/application/helper/to-dto/to.order.dto';

/**
 * Use case for fetching the most recent orders for a specific shop.
 */
@Injectable()
export class FetchRecentOrdersByShop {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Retrieves the most recent orders for a specific shop.
   * @param shopId - The unique ID of the shop.
   * @param limit - The number of most recent orders to retrieve.
   * @returns A promise that resolves to an array of the most recent Order DTOs.
   */
  async execute(shopId: number, limit: number): Promise<OrderDTO[]> {
    const orders = await this.orderService.getRecentOrdersByShop(shopId, limit);
    return orders.map(toOrderDTO);
  }
}
