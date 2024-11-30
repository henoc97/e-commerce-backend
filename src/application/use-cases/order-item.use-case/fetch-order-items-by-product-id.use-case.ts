import { Injectable } from '@nestjs/common';
import { OrderItemService } from 'src/application/services/order-item.service';
import { toOrderItemDTO } from 'src/application/helper/to-dto/to.order-item.dto';
import { OrderItemDTO } from 'src/presentation/dtos/order-item.dto';

/**
 * Use case class for fetching OrderItems by Product ID.
 * This class interacts with the OrderItemService to retrieve the OrderItems.
 */
@Injectable()
export class FetchOrderItemsByProductId {
  constructor(private readonly service: OrderItemService) { }

  /**
   * Execute the fetch-order-items-by-product-id use case.
   * @param productId - The unique ID of the Product.
   * @returns A promise that resolves to an array of OrderItem DTOs for the Product.
   */
  async execute(productId: number): Promise<OrderItemDTO[]> {
    const items = await this.service.getByProductId(productId);
    return items?.map(toOrderItemDTO);
  }
}
