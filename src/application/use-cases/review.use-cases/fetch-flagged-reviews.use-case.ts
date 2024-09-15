import { Injectable } from '@nestjs/common';
import { toReviewDTO } from 'src/application/helper/to-dto/to.review.dto';
import { ReviewService } from 'src/application/services/review.service';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';

/**
 * Use case class for fetching all flagged reviews for moderation.
 * This class encapsulates the business logic for retrieving flagged reviews.
 */
@Injectable()
export class FetchFlaggedReviews {
  constructor(private readonly service: ReviewService) {}

  /**
   * Execute the fetch-flagged-reviews use case.
   * @returns A promise that resolves to an array of flagged Review DTOs.
   */
  async execute(): Promise<ReviewDTO[]> {
    const flaggedReviews = await this.service.getFlaggedReviews();
    return flaggedReviews.map(toReviewDTO);
  }
}
