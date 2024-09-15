import { Review } from 'src/domain/entities/review.entity';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';
import { fromUserDTO } from './to.user.entity';
import { fromProductDTO } from './to.product.entity';

/**
 * Converts a ReviewDTO to a Review entity.
 * @param reviewDTO - The ReviewDTO to convert.
 * @returns The corresponding Review entity.
 */
export function fromReviewDTO(
  reviewDTO: ReviewDTO | Partial<ReviewDTO>,
): Review {
  return new Review(
    reviewDTO.id,
    reviewDTO.productId,
    reviewDTO.product ? fromProductDTO(reviewDTO.product) : undefined,
    reviewDTO.userId,
    reviewDTO.user ? fromUserDTO(reviewDTO.user) : undefined,
    reviewDTO.rating,
    reviewDTO.comment,
    reviewDTO.createdAt,
  );
}
