import { Injectable } from '@nestjs/common';
import { toProductImageDTO } from 'src/application/helper/to-dto/to.product-image.dto';
import { ProductImageService } from 'src/application/services/product-image.service';
import { ProductImageDTO } from 'src/presentation/dtos/product-image.dto';

/**
 * Use case class for fetching all product images by product ID.
 */
@Injectable()
export class FetchProductImagesByProductId {
  constructor(private readonly productImageService: ProductImageService) {}

  /**
   * Execute the fetch-product-images-by-product-id use case.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to an array of ProductImage DTOs.
   */
  async execute(productId: number): Promise<ProductImageDTO[]> {
    const images =
      await this.productImageService.getProductImagesByProductId(productId);
    return images.map(toProductImageDTO);
  }
}
