import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/application/services/order.service';

/**
 * Use case for deleting an order.
 */
@Injectable()
export class DeleteOrder {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Deletes an order by its ID.
   * @param id - The unique ID of the order.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async execute(id: number): Promise<boolean> {
    return this.orderService.deleteOrder(id);
  }
}
