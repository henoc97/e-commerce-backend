import { Injectable } from '@nestjs/common';
import { toReviewDTO } from 'src/application/helper/to-dto/to.review.dto';
import { ReviewService } from 'src/application/services/review.service';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';

/**
 * Use case class for fetching a review by its ID.
 * This class encapsulates the business logic for retrieving a review by its ID.
 */
@Injectable()
export class FetchReviewById {
  constructor(private readonly service: ReviewService) {}

  /**
   * Execute the fetch-review-by-id use case.
   * @param id - The ID of the review to retrieve.
   * @returns A promise that resolves to the Review DTO if found, otherwise null.
   */
  async execute(id: number): Promise<ReviewDTO | null> {
    const review = await this.service.getReviewById(id);

    if (!review) return null;

    return toReviewDTO(review);
  }
}
