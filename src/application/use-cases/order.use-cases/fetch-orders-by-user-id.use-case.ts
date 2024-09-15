import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/application/services/order.service';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { toOrderDTO } from 'src/application/helper/to-dto/to.order.dto';

/**
 * Use case for fetching orders by user ID.
 */
@Injectable()
export class FetchOrdersByUserId {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Retrieves all orders for a specific user.
   * @param userId - The unique ID of the user.
   * @returns A promise that resolves to an array of Order DTOs for the user.
   */
  async execute(userId: number): Promise<OrderDTO[]> {
    const orders = await this.orderService.getOrdersByUserId(userId);
    return orders.map(toOrderDTO);
  }
}
