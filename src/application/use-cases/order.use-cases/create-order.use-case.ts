import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/application/services/order.service';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { toOrderDTO } from 'src/application/helper/to-dto/to.order.dto';

/**
 * Use case for creating a new order.
 */
@Injectable()
export class CreateOrder {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Creates a new order.
   * @param orderDTO - The Order DTO containing the order data.
   * @returns A promise that resolves to the created Order DTO.
   */
  async execute(orderDTO: OrderDTO): Promise<OrderDTO | null> {
    const createdOrder = await this.orderService.createOrder(orderDTO);
    if (!createdOrder) return null;
    return toOrderDTO(createdOrder);
  }
}
