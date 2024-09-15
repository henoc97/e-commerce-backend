import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/application/services/order.service';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { toOrderDTO } from 'src/application/helper/to-dto/to.order.dto';

/**
 * Use case for adding a refund to an order.
 */
@Injectable()
export class AddRefundToOrder {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Adds a refund to an order.
   * @param orderId - The ID of the order.
   * @param refundId - The ID of the refund to add.
   * @returns A promise that resolves to the updated Order DTO.
   */
  async execute(orderId: number, refundId: string): Promise<OrderDTO | null> {
    const updatedOrder = await this.orderService.addRefundToOrder(
      orderId,
      refundId,
    );
    if (!updatedOrder) return null;
    return toOrderDTO(updatedOrder);
  }
}
