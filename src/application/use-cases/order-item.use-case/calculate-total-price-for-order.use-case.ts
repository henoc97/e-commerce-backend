import { Injectable } from '@nestjs/common';
import { OrderItemService } from 'src/application/services/order-item.service';

/**
 * Use case class for calculating the total price of OrderItems in an Order.
 * This class interacts with the OrderItemService to perform the calculation.
 */
@Injectable()
export class CalculateTotalPriceForOrder {
  constructor(private readonly service: OrderItemService) {}

  /**
   * Execute the calculate-total-price use case.
   * @param orderId - The unique ID of the Order.
   * @returns A promise that resolves to the total price of the OrderItems.
   */
  async execute(orderId: number): Promise<number> {
    const totalPrice = await this.service.calculateTotalPrice(orderId);
    return totalPrice;
  }
}
