import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/application/services/order.service';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { toOrderDTO } from 'src/application/helper/to-dto/to.order.dto';

/**
 * Use case for fetching orders within a specific date range.
 */
@Injectable()
export class FetchOrdersByDateRange {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Retrieves all orders created within a specific date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to an array of Order DTOs created within the date range.
   */
  async execute(startDate: Date, endDate: Date): Promise<OrderDTO[]> {
    const orders = await this.orderService.getOrdersByDateRange(
      startDate,
      endDate,
    );
    return orders.map(toOrderDTO);
  }
}
