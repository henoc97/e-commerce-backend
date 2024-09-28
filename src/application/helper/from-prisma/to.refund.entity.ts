import { Refund } from 'src/domain/entities/refund.entity';
import { fromOrderPrisma } from './to.order.entity';

/**
 * Converts a RefundPrisma to a Refund entity.
 * @param refundPrisma - The RefundPrisma to convert.
 * @returns The corresponding Refund entity.
 */
export function fromRefundPrisma(refundPrisma: any): Refund {
  return new Refund(
    refundPrisma.id,
    refundPrisma.orderId,
    refundPrisma.order ? fromOrderPrisma(refundPrisma.order) : undefined, // Assuming Order entity conversion is handled in Refund entity
    refundPrisma.reason,
    refundPrisma.amount,
    refundPrisma.status,
    refundPrisma.createdAt,
  );
}
