import { Injectable } from '@nestjs/common';
import { OrderItemService } from 'src/application/services/order-item.service';
import { toOrderItemDTO } from 'src/application/helper/to-dto/to.order-item.dto';
import { OrderItemDTO } from 'src/presentation/dtos/order-item.dto';

/**
 * Use case class for fetching OrderItems by Order ID.
 * This class interacts with the OrderItemService to retrieve the OrderItems.
 */
@Injectable()
export class FetchOrderItemsByOrderId {
  constructor(private readonly service: OrderItemService) { }

  /**
   * Execute the fetch-order-items-by-order-id use case.
   * @param orderId - The unique ID of the Order.
   * @returns A promise that resolves to an array of OrderItem DTOs for the Order.
   */
  async execute(orderId: number): Promise<OrderItemDTO[]> {
    const items = await this.service.getByOrderId(orderId);
    return items?.map(toOrderItemDTO);
  }
}
