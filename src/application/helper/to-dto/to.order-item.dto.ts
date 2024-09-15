import { OrderItem } from 'src/domain/entities/order-item.enttity';
import { OrderItemDTO } from 'src/presentation/dtos/order-item.dto';
import { toOrderDTO } from './to.order.dto';
import { toProductDTO } from './to.product.dto';

/**
 * Converts an OrderItem entity to an OrderItemDTO.
 * @param orderItem - The OrderItem entity to convert.
 * @returns The corresponding OrderItemDTO.
 */
export function toOrderItemDTO(orderItem: OrderItem): OrderItemDTO {
  return new OrderItemDTO(
    orderItem.orderId,
    orderItem.productId,
    orderItem.quantity,
    orderItem.price,
    orderItem.id,
    orderItem.order ? toOrderDTO(orderItem.order) : undefined,
    orderItem.product ? toProductDTO(orderItem.product) : undefined,
  );
}
