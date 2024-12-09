import { Injectable } from '@nestjs/common';
import { ProductImageService } from '../../../application/services/product-image.service';
import { ProductImageDTO } from '../../../presentation/dtos/product-image.dto';
import { toProductImageDTO } from '../../../application/helper/to-dto/to.product-image.dto';

/**
 * Use case class for creating a product image.
 */
@Injectable()
export class CreateProductImage {
  constructor(private readonly productImageService: ProductImageService) { }

  /**
   * Execute the create-product-image use case.
   * @param imageDTO - The ProductImageDTO containing the image data to be created.
   * @returns A promise that resolves to the created ProductImage DTO.
   */
  async execute(imageDTO: ProductImageDTO): Promise<ProductImageDTO | null> {
    const createdImage =
      await this.productImageService.createProductImage(imageDTO);
    if (!createdImage) return null;
    return toProductImageDTO(createdImage);
  }
}
