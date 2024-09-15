import { Injectable } from '@nestjs/common';
import { ProductImageService } from 'src/application/services/product-image.service';
import { ProductImageDTO } from 'src/presentation/dtos/product-image.dto';
import { toProductImageDTO } from 'src/application/helper/to-dto/to.product-image.dto';

/**
 * Use case class for updating a product image.
 */
@Injectable()
export class UpdateProductImage {
  constructor(private readonly productImageService: ProductImageService) {}

  /**
   * Execute the update-product-image use case.
   * @param id - The unique ID of the product image.
   * @param updates - The data to update.
   * @returns A promise that resolves to the updated ProductImage DTO.
   */
  async execute(
    id: number,
    updates: Partial<ProductImageDTO>,
  ): Promise<ProductImageDTO | null> {
    const updatedImage = await this.productImageService.updateProductImage(
      id,
      updates,
    );
    if (!updatedImage) return null;
    return toProductImageDTO(updatedImage);
  }
}
