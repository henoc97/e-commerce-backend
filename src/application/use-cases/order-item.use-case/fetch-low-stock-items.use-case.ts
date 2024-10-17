import { Injectable } from '@nestjs/common';
import { OrderItemService } from 'src/application/services/order-item.service';
import { toOrderItemDTO } from 'src/application/helper/to-dto/to.order-item.dto';
import { OrderItemDTO } from 'src/presentation/dtos/order-item.dto';

/**
 * Use case class for fetching OrderItems with low stock.
 * This class interacts with the OrderItemService to retrieve low stock items.
 */
@Injectable()
export class FetchLowStockItems {
  constructor(private readonly service: OrderItemService) {}

  /**
   * Execute the fetch-low-stock-items use case.
   * @param threshold - The quantity threshold for low stock.
   * @returns A promise that resolves to an array of low stock OrderItem DTOs.
   */
  async execute(threshold: number): Promise<OrderItemDTO[]> {
    const items = await this.service.getLowStockItems(threshold);
    return items.map(toOrderItemDTO);
  }
}
