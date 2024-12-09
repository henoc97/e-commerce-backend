import { OrderItem } from '../../../domain/entities/order-item.enttity';
import { fromOrderPrisma } from './to.order.entity';
import { fromProductPrisma } from './to.product.entity';

/**
 * Converts an OrderItemPrisma to an OrderItem entity.
 * @param orderItemPrisma - The OrderItemPrisma to convert.
 * @returns The corresponding OrderItem entity.
 */
export function fromOrderItemPrisma(orderItemPrisma: any): OrderItem {
  return new OrderItem(
    orderItemPrisma.id,
    orderItemPrisma.orderId,
    orderItemPrisma.productId,
    orderItemPrisma.quantity,
    orderItemPrisma.price,
    orderItemPrisma.order ? fromOrderPrisma(orderItemPrisma.order) : undefined,
    orderItemPrisma.product
      ? fromProductPrisma(orderItemPrisma.product)
      : undefined,
  );
}
