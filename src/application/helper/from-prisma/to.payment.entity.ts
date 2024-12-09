import { Payment } from '../../../domain/entities/payment.entity';
import { fromOrderPrisma } from './to.order.entity';

/**
 * Converts a PaymentPrisma to a Payment entity.
 * @param paymentPrisma - The PaymentPrisma to convert.
 * @returns The corresponding Payment entity.
 */
export function fromPaymentPrisma(paymentPrisma: any): Payment {
  return new Payment(
    paymentPrisma.id,
    paymentPrisma.orderId,
    paymentPrisma.order ? fromOrderPrisma(paymentPrisma.order) : undefined,
    paymentPrisma.method,
    paymentPrisma.status,
    paymentPrisma.amount,
    paymentPrisma.providerId,
    paymentPrisma.metadata,
    paymentPrisma.createdAt,
  );
}
