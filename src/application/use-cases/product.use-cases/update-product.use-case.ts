import { Injectable } from '@nestjs/common';
import ProductService from '../../../application/services/product.service';
import { ProductDTO } from '../../../presentation/dtos/product.dto';
import { toProductDTO } from '../../../application/helper/to-dto/to.product.dto';

/**
 * Use case class for updating a product's details.
 */
@Injectable()
export class UpdateProduct {
  constructor(private readonly productService: ProductService) { }

  /**
   * Executes the use case to update a product's details.
   * @param productId - The unique ID of the product.
   * @param productDTO - T The data to update.
   * @returns A promise that resolves to the updated Product DTO.
   */
  async execute(
    productId: number,
    productDTO: Partial<ProductDTO>,
  ): Promise<ProductDTO | null> {
    const product = await this.productService.updateProduct(
      productId,
      productDTO,
    );

    if (!product) return null;

    return toProductDTO(product);
  }
}
