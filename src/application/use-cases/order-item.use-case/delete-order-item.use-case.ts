import { Injectable } from '@nestjs/common';
import { OrderItemService } from 'src/application/services/order-item.service';

/**
 * Use case class for deleting an OrderItem.
 * This class interacts with the OrderItemService to perform the deletion.
 */
@Injectable()
export class DeleteOrderItem {
  constructor(private readonly service: OrderItemService) {}

  /**
   * Execute the delete-order-item use case.
   * @param id - The unique ID of the OrderItem to delete.
   * @returns A promise that resolves to true if the deletion was successful, otherwise false.
   */
  async execute(id: number): Promise<boolean> {
    return await this.service.delete(id);
  }
}
