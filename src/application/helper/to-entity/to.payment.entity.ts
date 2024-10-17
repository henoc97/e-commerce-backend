import { Payment } from 'src/domain/entities/payment.entity';
import { PaymentDTO } from 'src/presentation/dtos/payment.dto';
import { fromOrderDTO } from './to.order.entity';

/**
 * Converts a PaymentDTO to a Payment entity.
 * @param paymentDTO - The PaymentDTO to convert.
 * @returns The corresponding Payment entity.
 */
export function fromPaymentDTO(
  paymentDTO: PaymentDTO | Partial<PaymentDTO>,
): Payment {
  return new Payment(
    paymentDTO.id,
    paymentDTO.orderId,
    paymentDTO.order ? fromOrderDTO(paymentDTO.order) : undefined,
    paymentDTO.method,
    paymentDTO.status,
    paymentDTO.amount,
    paymentDTO.currency,
    paymentDTO.providerId,
    paymentDTO.metadata,
    paymentDTO.createdAt,
  );
}
