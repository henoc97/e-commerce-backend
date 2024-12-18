import { Injectable } from '@nestjs/common';
import { OrderService } from '../../../application/services/order.service';
import { OrderDTO } from '../../../presentation/dtos/order.dto';
import { toOrderDTO } from '../../../application/helper/to-dto/to.order.dto';

/**
 * Use case for fetching all orders.
 */
@Injectable()
export class FetchOrders {
  constructor(private readonly orderService: OrderService) { }

  /**
   * Retrieves all orders.
   * @returns A promise that resolves to an array of all Order DTOs.
   */
  async execute(): Promise<OrderDTO[]> {
    const orders = await this.orderService.getAllOrders();
    return orders?.map(toOrderDTO);
  }
}
