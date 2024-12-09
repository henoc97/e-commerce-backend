import { Injectable } from '@nestjs/common';
import { ReviewService } from '../../../application/services/review.service';

/**
 * Use case class for fetching the average rating for a product.
 * This class encapsulates the business logic for calculating average ratings.
 */
@Injectable()
export class FetchAverageRating {
  constructor(private readonly service: ReviewService) { }

  /**
   * Execute the fetch-average-rating use case.
   * @param productId - The ID of the product to calculate the average rating for.
   * @returns A promise that resolves to the average rating.
   */
  async execute(productId: number): Promise<number> {
    return this.service.getAverageRating(productId);
  }
}
