import { Injectable } from '@nestjs/common';
import { OrderItemService } from 'src/application/services/order-item.service';
import { toOrderItemDTO } from 'src/application/helper/to-dto/to.order-item.dto';

/**
 * Use case class for fetching an OrderItem by its ID.
 * This class interacts with the OrderItemService to retrieve the OrderItem.
 */
@Injectable()
export class FetchOrderItemById {
  constructor(private readonly service: OrderItemService) {}

  /**
   * Execute the fetch-order-item-by-id use case.
   * @param id - The unique ID of the OrderItem.
   * @returns A promise that resolves to the OrderItem DTO if found, otherwise null.
   */
  async execute(id: number): Promise<OrderItemDTO | null> {
    const item = await this.service.getById(id);
    if (!item) return null;
    return toOrderItemDTO(item);
  }
}
