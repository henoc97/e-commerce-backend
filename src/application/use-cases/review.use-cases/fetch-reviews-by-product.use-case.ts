import { Injectable } from '@nestjs/common';
import { toReviewDTO } from 'src/application/helper/to-dto/to.review.dto';
import { ReviewService } from 'src/application/services/review.service';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';

/**
 * Use case class for fetching all reviews for a specific product.
 * This class encapsulates the business logic for retrieving reviews by product ID.
 */
@Injectable()
export class FetchReviewsByProduct {
  constructor(private readonly service: ReviewService) {}

  /**
   * Execute the fetch-reviews-by-product use case.
   * @param productId - The ID of the product to retrieve reviews for.
   * @returns A promise that resolves to an array of Review DTOs for the specified product.
   */
  async execute(productId: number): Promise<ReviewDTO[]> {
    const reviews = await this.service.getReviewsByProduct(productId);
    return reviews.map(toReviewDTO);
  }
}
