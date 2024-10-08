﻿import { Promotion } from 'src/domain/entities/promotion.entity';
import { PromotionDTO } from 'src/presentation/dtos/promotion.dto';
import { toProductDTO } from './to.product.dto';

/**
 * Converts a Promotion entity to PromotionDTO.
 * @param promotion - The Promotion entity to convert.
 * @returns The corresponding PromotionDTO.
 */
export function toPromotionDTO(promotion: Promotion): PromotionDTO {
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
