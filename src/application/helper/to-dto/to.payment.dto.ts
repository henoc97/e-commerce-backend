import { Payment } from 'src/domain/entities/payment.entity';
import { PaymentDTO } from 'src/presentation/dtos/payment.dto';
import { toOrderDTO } from './to.order.dto';

/**
 * Converts a Payment entity to PaymentDTO.
 * @param payment - The Payment entity to convert.
 * @returns The corresponding PaymentDTO.
 */
export function toPaymentDTO(payment: Payment): PaymentDTO {
  return new PaymentDTO(
    payment.id,
    payment.orderId,
    payment.order ? toOrderDTO(payment.order) : undefined,
    payment.method,
    payment.status,
    payment.amount,
    payment.providerId,
    payment.metadata,
    payment.createdAt,
  );
}
