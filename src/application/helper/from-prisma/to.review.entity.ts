import { Review } from 'src/domain/entities/review.entity';
import { fromUserPrisma } from './to.user.entity';
import { fromProductPrisma } from './to.product.entity';

/**
 * Converts a ReviewPrisma to a Review entity.
 * @param reviewPrisma - The ReviewPrisma to convert.
 * @returns The corresponding Review entity.
 */
export function fromReviewPrisma(reviewPrisma: any): Review {
  return new Review(
    reviewPrisma.id,
    reviewPrisma.productId,
    reviewPrisma.product ? fromProductPrisma(reviewPrisma.product) : undefined,
    reviewPrisma.userId,
    reviewPrisma.user ? fromUserPrisma(reviewPrisma.user) : undefined,
    reviewPrisma.rating,
    reviewPrisma.comment,
    reviewPrisma.createdAt,
  );
}
