import { Injectable } from '@nestjs/common';
import { ProductImageService } from 'src/application/services/product-image.service';

/**
 * Use case class for checking the existence of a product image.
 */
@Injectable()
export class CheckProductImageExistence {
  constructor(private readonly productImageService: ProductImageService) {}

  /**
   * Execute the check-product-image-existence use case.
   * @param productId - The unique ID of the product.
   * @param url - The URL of the product image.
   * @returns A promise that resolves to true if the image exists, otherwise false.
   */
  async execute(productId: number, url: string): Promise<boolean> {
    return this.productImageService.doesProductImageExist(productId, url);
  }
}
