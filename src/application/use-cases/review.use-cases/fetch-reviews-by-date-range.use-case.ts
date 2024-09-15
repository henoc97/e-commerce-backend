import { Injectable } from '@nestjs/common';
import { toReviewDTO } from 'src/application/helper/to-dto/to.review.dto';
import { ReviewService } from 'src/application/services/review.service';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';

/**
 * Use case class for fetching reviews within a specific date range.
 * This class encapsulates the business logic for retrieving reviews by date range.
 */
@Injectable()
export class FetchReviewsByDateRange {
  constructor(private readonly service: ReviewService) {}

  /**
   * Execute the fetch-reviews-by-date-range use case.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to an array of Review DTOs within the date range.
   */
  async execute(startDate: Date, endDate: Date): Promise<ReviewDTO[]> {
    const reviews = await this.service.getReviewsByDateRange(
      startDate,
      endDate,
    );
    return reviews.map(toReviewDTO);
  }
}
