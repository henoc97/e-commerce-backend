import { Injectable } from '@nestjs/common';
import { toProductDTO } from '../../../application/helper/to-dto/to.product.dto';
import ProductService from '../../../application/services/product.service';
import { ProductDTO } from '../../../presentation/dtos/product.dto';
import { ReviewDTO } from '../../../presentation/dtos/review.dto';

/**
 * Use case class for adding a review to a product.
 */
@Injectable()
export class AddReviewToProduct {
  constructor(private readonly productService: ProductService) { }

  /**
   * Executes the use case to add a review to a product.
   * @param productId - The unique ID of the product.
   * @param reviewDTO - The review data to add.
   * @returns A promise that resolves to the updated Product DTO.
   */
  async execute(
    productId: number,
    reviewDTO: ReviewDTO,
  ): Promise<ProductDTO | null> {
    const product = await this.productService.addReviewToProduct(
      productId,
      reviewDTO,
    );

    if (!product) return null;

    return toProductDTO(product);
  }
}
