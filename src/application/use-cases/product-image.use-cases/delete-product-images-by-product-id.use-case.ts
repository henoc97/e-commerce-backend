import { Injectable } from '@nestjs/common';
import { ProductImageService } from 'src/application/services/product-image.service';

/**
 * Use case class for deleting all product images by product ID.
 */
@Injectable()
export class DeleteProductImagesByProductId {
  constructor(private readonly productImageService: ProductImageService) {}

  /**
   * Execute the delete-product-images-by-product-id use case.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to true if the deletion was successful, otherwise false.
   */
  async execute(productId: number): Promise<boolean> {
    return this.productImageService.deleteProductImagesByProductId(productId);
  }
}
