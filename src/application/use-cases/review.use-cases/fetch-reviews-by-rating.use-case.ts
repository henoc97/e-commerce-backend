import { Injectable } from '@nestjs/common';
import { toReviewDTO } from 'src/application/helper/to-dto/to.review.dto';
import { ReviewService } from 'src/application/services/review.service';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';

/**
 * Use case class for fetching reviews by their rating.
 * This class encapsulates the business logic for retrieving reviews by rating.
 */
@Injectable()
export class FetchReviewsByRating {
  constructor(private readonly service: ReviewService) {}

  /**
   * Execute the fetch-reviews-by-rating use case.
   * @param rating - The rating to filter reviews by.
   * @returns A promise that resolves to an array of Review DTOs with the specified rating.
   */
  async execute(rating: number): Promise<ReviewDTO[]> {
    const reviews = await this.service.getReviewsByRating(rating);
    return reviews.map(toReviewDTO);
  }
}
