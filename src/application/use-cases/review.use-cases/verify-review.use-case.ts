import { Injectable } from '@nestjs/common';
import { toReviewDTO } from 'src/application/helper/to-dto/to.review.dto';
import { ReviewService } from 'src/application/services/review.service';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';

/**
 * Use case class for verifying a review.
 * This class encapsulates the business logic for verifying reviews.
 */
@Injectable()
export class VerifyReview {
  constructor(private readonly service: ReviewService) {}

  /**
   * Execute the verify-review use case.
   * @param id - The ID of the review to verify.
   * @returns A promise that resolves to the verified Review DTO.
   */
  async execute(id: number): Promise<ReviewDTO | null> {
    const review = await this.service.verifyReview(id);

    if (!review) return null;

    return toReviewDTO(review);
  }
}
