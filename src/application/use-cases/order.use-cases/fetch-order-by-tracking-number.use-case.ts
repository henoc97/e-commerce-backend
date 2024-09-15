import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/application/services/order.service';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { toOrderDTO } from 'src/application/helper/to-dto/to.order.dto';

/**
 * Use case for fetching an order by its tracking number.
 */
@Injectable()
export class FetchOrderByTrackingNumber {
  constructor(private readonly orderService: OrderService) {}

  /**
   * Retrieves an order by its tracking number.
   * @param trackingNumber - The tracking number of the order.
   * @returns A promise that resolves to the Order DTO if found, otherwise null.
   */
  async execute(trackingNumber: string): Promise<OrderDTO | null> {
    const order =
      await this.orderService.getOrderByTrackingNumber(trackingNumber);
    if (!order) return null;
    return toOrderDTO(order);
  }
}
