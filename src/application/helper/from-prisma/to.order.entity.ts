import { Order } from '../../../domain/entities/order.entity';
import { fromPaymentPrisma } from './to.payment.entity';
import { fromShopPrisma } from './to.shop.entity';
import { fromUserPrisma } from './to.user.entity';
import { fromOrderItemPrisma } from './to.order-item.entity';
import { fromRefundPrisma } from './to.refund.entity';

/**
 * Converts an OrderPrisma to Order entity.
 * @param orderPrisma - The OrderPrisma to convert.
 * @returns The corresponding OrderPrisma.
 */
export function fromOrderPrisma(orderPrisma: any): Order {
  return new Order(
    orderPrisma.id,
    orderPrisma.userId,
    orderPrisma.user ? fromUserPrisma(orderPrisma.user) : undefined,
    orderPrisma.shopId,
    orderPrisma.shop ? fromShopPrisma(orderPrisma.shop) : undefined,
    orderPrisma.items?.map((item: any) => fromOrderItemPrisma(item)),
    orderPrisma.status,
    orderPrisma.totalAmount,
    orderPrisma.paymentId,
    orderPrisma.trackingNumber,
    orderPrisma.createdAt,
    orderPrisma.updatedAt,
    orderPrisma.payments?.map((payment: any) => fromPaymentPrisma(payment)),
    orderPrisma.refunds?.map((refund: any) => fromRefundPrisma(refund)),
  );
}
