import { Injectable } from '@nestjs/common';
import { toReviewDTO } from 'src/application/helper/to-dto/to.review.dto';
import { ReviewService } from 'src/application/services/review.service';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';

/**
 * Use case class for fetching all reviews written by a specific user.
 * This class encapsulates the business logic for retrieving reviews by user ID.
 */
@Injectable()
export class FetchReviewsByUser {
  constructor(private readonly service: ReviewService) {}

  /**
   * Execute the fetch-reviews-by-user use case.
   * @param userId - The ID of the user to retrieve reviews for.
   * @returns A promise that resolves to an array of Review DTOs written by the specified user.
   */
  async execute(userId: number): Promise<ReviewDTO[]> {
    const reviews = await this.service.getReviewsByUser(userId);
    return reviews.map(toReviewDTO);
  }
}
