import { Promotion } from '../../../domain/entities/promotion.entity';
import { PromotionDTO } from '../../../presentation/dtos/promotion.dto';
import { toProductDTO } from './to.product.dto';

/**
 * Converts a Promotion entity to PromotionDTO.
 * @param promotion - The Promotion entity to convert.
 * @returns The corresponding PromotionDTO.
 */
export function toPromotionDTO(promotion: any): PromotionDTO {
  return new PromotionDTO(
    promotion.id,
    promotion.name,
    promotion.discountValue,
    promotion.discountType,
    promotion.startDate,
    promotion.endDate,
    promotion.productId,
    promotion.product ? toProductDTO(promotion.product) : undefined,
    promotion.createdAt,
    promotion.updatedAt,
  );
}
