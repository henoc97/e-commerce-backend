import { OrderItem } from 'src/domain/entities/order-item.enttity';
import { OrderItemDTO } from 'src/presentation/dtos/order-item.dto';
import { fromOrderDTO } from './to.order.entity';
import { fromProductDTO } from './to.product.entity';

/**
 * Converts an OrderItemDTO to an OrderItem entity.
 * @param orderItemDTO - The OrderItemDTO to convert.
 * @returns The corresponding OrderItem entity.
 */
export function fromOrderItemDTO(
  orderItemDTO: OrderItemDTO | Partial<OrderItemDTO>,
): OrderItem {
  return new OrderItem(
    orderItemDTO.id,
    orderItemDTO.orderId,
    orderItemDTO.productId,
    orderItemDTO.quantity,
    orderItemDTO.price,
    orderItemDTO.order ? fromOrderDTO(orderItemDTO.order) : undefined,
    orderItemDTO.product ? fromProductDTO(orderItemDTO.product) : undefined,
  );
}
