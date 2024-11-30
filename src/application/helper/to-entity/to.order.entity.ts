import { Order } from 'src/domain/entities/order.entity';
import { OrderDTO } from 'src/presentation/dtos/order.dto';
import { fromPaymentDTO } from './to.payment.entity';
import { fromShopDTO } from './to.shop.entity';
import { fromUserDTO } from './to.user.entity';
import { fromOrderItemDTO } from './to.order-item.entity';
import { fromRefundDTO } from './to.refund.entity';

/**
 * Converts an OrderDTO to Order entity.
 * @param orderDTO - The OrderDTO to convert.
 * @returns The corresponding OrderDTO.
 */
export function fromOrderDTO(orderDTO: OrderDTO | Partial<OrderDTO>): Order {
  return new Order(
    orderDTO.id,
    orderDTO.userId,
    orderDTO.user ? fromUserDTO(orderDTO.user) : undefined,
    orderDTO.shopId,
    orderDTO.shop ? fromShopDTO(orderDTO.shop) : undefined,
    orderDTO.items?.map((item) => fromOrderItemDTO(item)),
    orderDTO.status,
    orderDTO.totalAmount,
    orderDTO.paymentId,
    orderDTO.trackingNumber,
    orderDTO.createdAt,
    orderDTO.updatedAt,
    orderDTO.payments?.map((payment) => fromPaymentDTO(payment)),
    orderDTO.refunds?.map((refund) => fromRefundDTO(refund)),
  );
}
