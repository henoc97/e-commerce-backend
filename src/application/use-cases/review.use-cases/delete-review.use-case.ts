import { Injectable } from '@nestjs/common';
import { ReviewService } from '../../../application/services/review.service';

/**
 * Use case class for deleting a review.
 * This class encapsulates the business logic for deleting reviews.
 */
@Injectable()
export class DeleteReview {
  constructor(private readonly service: ReviewService) { }

  /**
   * Execute the delete-review use case.
   * @param id - The ID of the review to be deleted.
   * @returns A promise that resolves to a boolean indicating success.
   */
  async execute(id: number): Promise<boolean> {
    return this.service.deleteReview(id);
  }
}
