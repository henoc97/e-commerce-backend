import { Injectable } from '@nestjs/common';
import { OrderService } from '../../../application/services/order.service';
import { OrderDTO } from '../../../presentation/dtos/order.dto';
import { toOrderDTO } from '../../../application/helper/to-dto/to.order.dto';

/**
 * Use case for adding a payment to an order.
 */
@Injectable()
export class AddPaymentToOrder {
  constructor(private readonly orderService: OrderService) { }

  /**
   * Adds a payment to an order.
   * @param orderId - The ID of the order.
   * @param paymentId - The ID of the payment to add.
   * @returns A promise that resolves to the updated Order DTO.
   */
  async execute(orderId: number, paymentId: string): Promise<OrderDTO | null> {
    const updatedOrder = await this.orderService.addPaymentToOrder(
      orderId,
      paymentId,
    );
    if (!updatedOrder) return null;
    return toOrderDTO(updatedOrder);
  }
}
