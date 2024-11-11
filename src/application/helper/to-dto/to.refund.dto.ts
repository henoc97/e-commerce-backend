import { Refund } from 'src/domain/entities/refund.entity';
import { RefundDTO } from 'src/presentation/dtos/refund.dto';
import { toOrderDTO } from './to.order.dto';

/**
 * Converts a Refund entity to a RefundDTO.
 * @param refund - The Refund entity to convert.
 * @returns The corresponding RefundDTO.
 */
export function toRefundDTO(refund: any): RefundDTO {
  return new RefundDTO(
    refund.id,
    refund.orderId,
    refund.order ? toOrderDTO(refund.order) : undefined,
    refund.reason,
    refund.amount,
    refund.status,
    refund.createdAt,
  );
}
