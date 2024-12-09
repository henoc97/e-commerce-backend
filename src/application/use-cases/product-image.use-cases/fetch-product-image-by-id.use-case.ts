import { Injectable } from '@nestjs/common';
import { toProductImageDTO } from '../../../application/helper/to-dto/to.product-image.dto';
import { ProductImageService } from '../../../application/services/product-image.service';
import { ProductImageDTO } from '../../../presentation/dtos/product-image.dto';

/**
 * Use case class for fetching a product image by its ID.
 */
@Injectable()
export class FetchProductImageById {
  constructor(private readonly productImageService: ProductImageService) { }

  /**
   * Execute the fetch-product-image-by-id use case.
   * @param id - The unique ID of the product image.
   * @returns A promise that resolves to the ProductImage DTO if found, otherwise null.
   */
  async execute(id: number): Promise<ProductImageDTO | null> {
    const image = await this.productImageService.getProductImageById(id);
    if (!image) return null;
    return toProductImageDTO(image);
  }
}
