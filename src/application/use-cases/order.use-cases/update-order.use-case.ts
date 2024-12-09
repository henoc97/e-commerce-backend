import { Injectable } from '@nestjs/common';
import { OrderService } from '../../../application/services/order.service';
import { OrderDTO } from '../../../presentation/dtos/order.dto';
import { toOrderDTO } from '../../../application/helper/to-dto/to.order.dto';

/**
 * Use case for updating an order.
 */
@Injectable()
export class UpdateOrder {
  constructor(private readonly orderService: OrderService) { }

  /**
   * Updates an existing order.
   * @param orderId - The unique ID of the order.
   * @param updates - Partial data to update the order.
   * @returns A promise that resolves to the updated Order DTO.
   */
  async execute(
    orderId: number,
    updates: Partial<OrderDTO>,
  ): Promise<OrderDTO> {
    const order = await this.orderService.updateOrder(orderId, updates);
    return toOrderDTO(order);
  }
}
