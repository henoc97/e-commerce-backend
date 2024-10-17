import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/application/services/order.service';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { toOrderDTO } from 'src/application/helper/to-dto/to.order.dto';
import { OrderStatus } from 'src/domain/enums/order-status.enum';

/**
 * Use case for updating the status of an order.
 */
@Injectable()
export class UpdateOrderStatus {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Updates the status of an order.
   * @param orderId - The ID of the order.
   * @param status - The new status for the order.
   * @returns A promise that resolves to the updated Order DTO.
   */
  async execute(
    orderId: number,
    status: OrderStatus,
  ): Promise<OrderDTO | null> {
    const updatedOrder = await this.orderService.updateOrderStatus(
      orderId,
      status,
    );
    if (!updatedOrder) return null;
    return toOrderDTO(updatedOrder);
  }
}
