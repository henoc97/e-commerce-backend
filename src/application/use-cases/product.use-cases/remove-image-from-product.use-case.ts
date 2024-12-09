import { Injectable } from '@nestjs/common';
import ProductService from '../../../application/services/product.service';
import { ProductDTO } from '../../../presentation/dtos/product.dto';
import { toProductDTO } from '../../../application/helper/to-dto/to.product.dto';

/**
 * Use case class for removing an image from a product.
 */
@Injectable()
export class RemoveImageFromProduct {
  constructor(private readonly productService: ProductService) { }

  /**
   * Executes the use case to remove an image from a product.
   * @param productId - The unique ID of the product.
   * @param imageId - The unique ID of the image to remove.
   * @returns A promise that resolves to the updated Product DTO.
   */
  async execute(
    productId: number,
    imageId: number,
  ): Promise<ProductDTO | null> {
    const product = await this.productService.removeImageFromProduct(
      productId,
      imageId,
    );

    if (!product) return null;

    return toProductDTO(product);
  }
}
