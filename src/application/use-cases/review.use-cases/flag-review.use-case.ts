import { Injectable } from '@nestjs/common';
import { toReviewDTO } from 'src/application/helper/to-dto/to.review.dto';
import { ReviewService } from 'src/application/services/review.service';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';

/**
 * Use case class for flagging a review for moderation.
 * This class encapsulates the business logic for flagging reviews.
 */
@Injectable()
export class FlagReview {
  constructor(private readonly service: ReviewService) {}

  /**
   * Execute the flag-review use case.
   * @param id - The ID of the review to flag.
   * @returns A promise that resolves to the flagged Review DTO.
   */
  async execute(id: number): Promise<ReviewDTO | null> {
    const review = await this.service.flagReview(id);

    if (!review) return null;

    return toReviewDTO(review);
  }
}
