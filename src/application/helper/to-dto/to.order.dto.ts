import { OrderDTO } from '../../../presentation/dtos/order.dto';
import { toOrderItemDTO } from './to.order-item.dto';
import { toShopDTO } from './to.shop.dto';
import { toUserDTO } from './to.user.dto';
import { toPaymentDTO } from './to.payment.dto';
import { toRefundDTO } from './to.refund.dto';

/**
 * Converts an Order entity to an OrderDTO.
 * @param order - The Order entity to convert.
 * @returns The corresponding OrderDTO.
 */
export function toOrderDTO(order: any): OrderDTO {
  return new OrderDTO(
    order.userId,
    order.shopId,
    order.status,
    order.totalAmount,
    order.id,
    order.paymentId,
    order.trackingNumber,
    order.createdAt,
    order.updatedAt,
    order.items?.map((item) => toOrderItemDTO(item)),
    order.user ? toUserDTO(order.user) : undefined,
    order.shop ? toShopDTO(order.shop) : undefined,
    order.payments?.map((payment) => toPaymentDTO(payment)),
    order.refunds?.map((refund) => toRefundDTO(refund)),
  );
}
