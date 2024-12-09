import { Injectable } from '@nestjs/common';
import { toProductImageDTO } from '../../../application/helper/to-dto/to.product-image.dto';
import { ProductImageService } from '../../../application/services/product-image.service';
import { ProductImageDTO } from '../../../presentation/dtos/product-image.dto';

/**
 * Use case class for fetching the primary product image.
 */
@Injectable()
export class FetchPrimaryProductImage {
  constructor(private readonly productImageService: ProductImageService) { }

  /**
   * Execute the fetch-primary-product-image use case.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to the primary ProductImage DTO if found, otherwise null.
   */
  async execute(productId: number): Promise<ProductImageDTO | null> {
    const image =
      await this.productImageService.getPrimaryProductImage(productId);
    if (!image) return null;
    return toProductImageDTO(image);
  }
}
