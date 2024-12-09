import { Injectable } from '@nestjs/common';
import { toProductDTO } from '../../../application/helper/to-dto/to.product.dto';
import ProductService from '../../../application/services/product.service';
import { ProductImageDTO } from '../../../presentation/dtos/product-image.dto';
import { ProductDTO } from '../../../presentation/dtos/product.dto';

/**
 * Use case class for adding an image to a product.
 */
@Injectable()
export class AddImageToProduct {
  constructor(private readonly productService: ProductService) { }

  /**
   * Executes the use case to add an image to a product.
   * @param productId - The unique ID of the product.
   * @param productImageDTO - The image data to add.
   * @returns A promise that resolves to the updated Product DTO.
   */
  async execute(
    productId: number,
    productImageDTO: ProductImageDTO,
  ): Promise<ProductDTO | null> {
    const product = await this.productService.addImageToProduct(
      productId,
      productImageDTO,
    );

    if (!product) return null;

    return toProductDTO(product);
  }
}
