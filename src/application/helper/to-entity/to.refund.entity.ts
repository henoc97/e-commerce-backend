import { Refund } from '../../../domain/entities/refund.entity';
import { RefundDTO } from '../../../presentation/dtos/refund.dto';
import { fromOrderDTO } from './to.order.entity';

/**
 * Converts a RefundDTO to a Refund entity.
 * @param refundDTO - The RefundDTO to convert.
 * @returns The corresponding Refund entity.
 */
export function fromRefundDTO(
  refundDTO: RefundDTO | Partial<RefundDTO>,
): Refund {
  return new Refund(
    refundDTO.id,
    refundDTO.orderId,
    refundDTO.order ? fromOrderDTO(refundDTO.order) : undefined, // Assuming Order entity conversion is handled in Refund entity
    refundDTO.reason,
    refundDTO.amount,
    refundDTO.status,
    refundDTO.createdAt,
  );
}
