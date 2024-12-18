import { Injectable } from '@nestjs/common';
import { OrderService } from '../../../application/services/order.service';
import { OrderDTO } from '../../../presentation/dtos/order.dto';
import { OrderStatus } from '../../../domain/enums/order-status.enum';
import { toOrderDTO } from '../../../application/helper/to-dto/to.order.dto';

/**
 * Use case for fetching orders by status.
 */
@Injectable()
export class FetchOrdersByStatus {
  constructor(private readonly orderService: OrderService) { }

  /**
   * Retrieves all orders with a specific status.
   * @param status - The status of orders to find.
   * @returns A promise that resolves to an array of Order DTOs with the specified status.
   */
  async execute(status: OrderStatus): Promise<OrderDTO[]> {
    const orders = await this.orderService.getOrdersByStatus(status);
    return orders?.map(toOrderDTO);
  }
}
