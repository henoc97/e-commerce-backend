import { Injectable } from '@nestjs/common';
import { toReviewDTO } from '../../../application/helper/to-dto/to.review.dto';
import { ReviewService } from '../../../application/services/review.service';
import { ReviewDTO } from '../../../presentation/dtos/review.dto';

/**
 * Use case class for creating a new review.
 * This class encapsulates the business logic for creating reviews.
 */
@Injectable()
export class CreateReview {
  constructor(private readonly service: ReviewService) { }

  /**
   * Execute the create-review use case.
   * @param reviewDTO - The ReviewDTO containing the review data to be created.
   * @returns A promise that resolves to the created Review DTO.
   */
  async execute(reviewDTO: ReviewDTO): Promise<ReviewDTO | null> {
    const review = await this.service.createReview(reviewDTO);

    if (!review) return null;

    return toReviewDTO(review);
  }
}
