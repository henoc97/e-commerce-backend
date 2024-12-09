import { Injectable } from '@nestjs/common';
import { OrderItemService } from '../../../application/services/order-item.service';
import { toOrderItemDTO } from '../../../application/helper/to-dto/to.order-item.dto';
import { OrderItemDTO } from '../../../presentation/dtos/order-item.dto';

/**
 * Use case class for fetching recent OrderItems.
 * This class interacts with the OrderItemService to retrieve recent OrderItems.
 */
@Injectable()
export class FetchRecentOrderItems {
  constructor(private readonly service: OrderItemService) { }

  /**
   * Execute the fetch-recent-order-items use case.
   * @param orderId - The unique ID of the Order.
   * @returns A promise that resolves to an array of recent OrderItem DTOs.
   */
  async execute(orderId: number): Promise<OrderItemDTO[]> {
    const items = await this.service.getRecentItems(orderId);
    return items?.map(toOrderItemDTO);
  }
}
