import { Review } from 'src/domain/entities/review.entity';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';
import { toUserDTO } from './to.user.dto';
import { toProductDTO } from './to.product.dto';

/**
 * Converts a Review entity to a ReviewDTO.
 * @param review - The Review entity to convert.
 * @returns The corresponding ReviewDTO.
 */
export function toReviewDTO(review: Review): ReviewDTO {
  return new ReviewDTO(
    review.id,
    review.productId,
    review.product ? toProductDTO(review.product) : undefined,
    review.userId,
    review.user ? toUserDTO(review.user) : undefined,
    review.rating,
    review.comment,
    review.createdAt,
  );
}
