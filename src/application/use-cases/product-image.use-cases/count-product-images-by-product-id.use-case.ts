import { Injectable } from '@nestjs/common';
import { ProductImageService } from 'src/application/services/product-image.service';

/**
 * Use case class for counting product images by product ID.
 */
@Injectable()
export class CountProductImagesByProductId {
  constructor(private readonly productImageService: ProductImageService) {}

  /**
   * Execute the count-product-images-by-product-id use case.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to the count of product images.
   */
  async execute(productId: number): Promise<number> {
    return this.productImageService.countProductImagesByProductId(productId);
  }
}
