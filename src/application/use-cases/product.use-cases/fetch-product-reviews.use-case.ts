import { Injectable } from '@nestjs/common';
import { toReviewDTO } from 'src/application/helper/to-dto/to.review.dto';
import { ProductService } from 'src/application/services/product.service';
import { ReviewDTO } from 'src/presentation/dtos/review.dto';

/**
 * Use case class for fetching all reviews for a product.
 */
@Injectable()
export class FetchProductReviews {
  constructor(private readonly productService: ProductService) {}

  /**
   * Executes the use case to fetch all reviews for a product.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to an array of Review DTOs.
   */
  async execute(productId: number): Promise<ReviewDTO[]> {
    const reviews = await this.productService.getProductReviews(productId);
    return reviews.map(toReviewDTO);
  }
}
