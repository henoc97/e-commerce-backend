import { OrderItem } from 'src/domain/entities/order-item.enttity';
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
    orderItemPrisma.order ? fromOrderPrisma(orderItemPrisma.order) : undefined,
    orderItemPrisma.productId,
    orderItemPrisma.product
      ? fromProductPrisma(orderItemPrisma.product)
      : undefined,
    orderItemPrisma.quantity,
    orderItemPrisma.price,
  );
}
