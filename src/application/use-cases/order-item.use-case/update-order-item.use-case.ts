import { Injectable } from '@nestjs/common';
import { OrderItemService } from '../../../application/services/order-item.service';
import { toOrderItemDTO } from '../../../application/helper/to-dto/to.order-item.dto';
import { OrderItemDTO } from '../../../presentation/dtos/order-item.dto';

/**
 * Use case class for updating an existing OrderItem.
 * This class interacts with the OrderItemService to perform the update.
 */
@Injectable()
export class UpdateOrderItem {
  constructor(private readonly service: OrderItemService) { }

  /**
   * Execute the update-order-item use case.
   * @param id - The unique ID of the OrderItem to update.
   * @param updates - Partial data to update the OrderItem.
   * @returns A promise that resolves to the updated OrderItem DTO.
   */
  async execute(
    id: number,
    updates: Partial<OrderItemDTO>,
  ): Promise<OrderItemDTO | null> {
    const updatedItem = await this.service.update(id, updates);
    if (!updatedItem) return null;
    return toOrderItemDTO(updatedItem);
  }
}
