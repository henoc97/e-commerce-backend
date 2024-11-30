import { Injectable } from '@nestjs/common';
import { toReviewDTO } from 'src/application/helper/to-dto/to.review.dto';
import { ReviewService } from 'src/application/services/review.service';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';

/**
 * Use case class for fetching the most popular reviews.
 * This class encapsulates the business logic for retrieving popular reviews.
 */
@Injectable()
export class FetchPopularReviews {
  constructor(private readonly service: ReviewService) { }

  /**
   * Execute the fetch-popular-reviews use case.
   * @param limit - The maximum number of popular reviews to retrieve.
   * @returns A promise that resolves to an array of popular Review DTOs.
   */
  async execute(limit: number): Promise<ReviewDTO[]> {
    const popularReviews = await this.service.getPopularReviews(limit);
    return popularReviews?.map(toReviewDTO);
  }
}
