import { Injectable } from '@nestjs/common';
import { toReviewDTO } from 'src/application/helper/to-dto/to.review.dto';
import { ReviewService } from 'src/application/services/review.service';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';

/**
 * Use case class for updating a review.
 * This class encapsulates the business logic for updating reviews.
 */
@Injectable()
export class UpdateReview {
  constructor(private readonly service: ReviewService) {}

  /**
   * Execute the update-review use case.
   * @param id - The ID of the review to update.
   * @param reviewDTO - The ReviewDTO object containing the updated review data.
   * @returns A promise that resolves to the updated Review DTO.
   */
  async execute(id: number, reviewDTO: ReviewDTO): Promise<ReviewDTO | null> {
    const updatedReview = await this.service.updateReview(id, reviewDTO);

    if (!updatedReview) return null;

    return toReviewDTO(updatedReview);
  }
}
