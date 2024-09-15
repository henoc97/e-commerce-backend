import { Injectable } from '@nestjs/common';
import { ProductImageService } from 'src/application/services/product-image.service';
import { ProductImageDTO } from 'src/presentation/dtos/product-image.dto';
import { fromProductImageDTO } from 'src/application/helper/to-entity/to.product-image.entity';

/**
 * Use case class for creating a product image.
 */
@Injectable()
export class CreateProductImage {
  constructor(private readonly productImageService: ProductImageService) {}

  /**
   * Execute the create-product-image use case.
   * @param imageDTO - The ProductImageDTO containing the image data to be created.
   * @returns A promise that resolves to the created ProductImage DTO.
   */
  async execute(imageDTO: ProductImageDTO): Promise<ProductImageDTO | null> {
    const createdImage =
      await this.productImageService.createProductImage(imageDTO);
    if (!createdImage) return null;
    return fromProductImageDTO(createdImage);
  }
}
