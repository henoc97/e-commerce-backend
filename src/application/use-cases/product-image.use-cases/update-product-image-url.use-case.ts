import { Injectable } from '@nestjs/common';
import { toProductImageDTO } from 'src/application/helper/to-dto/to.product-image.dto';
import { ProductImageService } from 'src/application/services/product-image.service';
import { ProductImageDTO } from 'src/presentation/dtos/product-image.dto';

/**
 * Use case class for updating the URL of a product image.
 */
@Injectable()
export class UpdateProductImageUrl {
  constructor(private readonly productImageService: ProductImageService) {}

  /**
   * Execute the update-product-image-url use case.
   * @param id - The unique ID of the product image.
   * @param url - The new URL of the product image.
   * @returns A promise that resolves to the updated ProductImage DTO.
   */
  async execute(id: number, url: string): Promise<ProductImageDTO> {
    const updatedImage = await this.productImageService.updateProductImageUrl(
      id,
      url,
    );
    return toProductImageDTO(updatedImage);
  }
}
