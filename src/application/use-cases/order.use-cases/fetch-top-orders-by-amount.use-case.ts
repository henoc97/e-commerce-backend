import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/application/services/order.service';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { toOrderDTO } from 'src/application/helper/to-dto/to.order.dto';

/**
 * Use case for fetching the top orders by amount.
 */
@Injectable()
export class FetchTopOrdersByAmount {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Retrieves the top N orders with the highest total amounts.
   * @param topN - The number of top orders to retrieve.
   * @returns A promise that resolves to an array of the top Order DTOs by total amount.
   */
  async execute(topN: number): Promise<OrderDTO[]> {
    const orders = await this.orderService.getTopOrdersByAmount(topN);
    return orders.map(toOrderDTO);
  }
}
