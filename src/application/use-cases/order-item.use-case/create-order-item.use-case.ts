import { Injectable } from '@nestjs/common';
import { OrderItemService } from '../../../application/services/order-item.service';
import { toOrderItemDTO } from '../../../application/helper/to-dto/to.order-item.dto';
import { OrderItemDTO } from '../../../presentation/dtos/order-item.dto';

/**
 * Use case class for creating a new OrderItem.
 * This class interacts with the OrderItemService to perform the creation.
 */
@Injectable()
export class CreateOrderItem {
  constructor(private readonly service: OrderItemService) { }

  /**
   * Execute the create-order-item use case.
   * @param orderItemDTO - The OrderItemDTO containing the data for the new OrderItem.
   * @returns A promise that resolves to the created OrderItem DTO.
   */
  async execute(orderItemDTO: OrderItemDTO): Promise<OrderItemDTO | null> {
    const orderItem = await this.service.create(orderItemDTO);
    if (!orderItem) return null;
    return toOrderItemDTO(orderItem);
  }
}
