import { Promotion } from '../../../domain/entities/promotion.entity';
import { PromotionDTO } from '../../../presentation/dtos/promotion.dto';
import { fromProductDTO } from './to.product.entity';

/**
 * Converts a PromotionDTO to a Promotion entity.
 * @param promotionDTO - The PromotionDTO to convert.
 * @returns The corresponding Promotion entity.
 */
export function fromPromotionDTO(
  promotionDTO: PromotionDTO | Partial<PromotionDTO>,
): Promotion {
  return new Promotion(
    promotionDTO.id,
    promotionDTO.name,
    promotionDTO.discountValue,
    promotionDTO.discountType,
    promotionDTO.startDate,
    promotionDTO.endDate,
    promotionDTO.productId,
    promotionDTO.product ? fromProductDTO(promotionDTO.product) : undefined,
    promotionDTO.createdAt,
    promotionDTO.updatedAt,
  );
}
