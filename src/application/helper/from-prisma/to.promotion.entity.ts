import { Promotion } from 'src/domain/entities/promotion.entity';
import { fromProductPrisma } from './to.product.entity';

/**
 * Converts a PromotionPrisma to a Promotion entity.
 * @param promotionPrisma - The PromotionPrisma to convert.
 * @returns The corresponding Promotion entity.
 */
export function fromPromotionPrisma(promotionPrisma: any): Promotion {
  return new Promotion(
    promotionPrisma.id,
    promotionPrisma.name,
    promotionPrisma.discountValue,
    promotionPrisma.discountType,
    promotionPrisma.startDate,
    promotionPrisma.endDate,
    promotionPrisma.productId,
    promotionPrisma.product
      ? fromProductPrisma(promotionPrisma.product)
      : undefined,
    promotionPrisma.createdAt,
    promotionPrisma.updatedAt,
  );
}
