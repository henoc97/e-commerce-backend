import { Injectable } from '@nestjs/common';
import ProductService from 'src/application/services/product.service';
import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { toProductDTO } from 'src/application/helper/to-dto/to.product.dto';

/**
 * Use case class for updating the stock of a product.
 */
@Injectable()
export class UpdateProductStock {
  constructor(private readonly productService: ProductService) {}

  /**
   * Executes the use case to update a product's stock quantity.
   * @param productId - The unique ID of the product.
   * @param quantity - The new stock quantity.
   * @returns A promise that resolves to the updated Product DTO.
   */
  async execute(
    productId: number,
    quantity: number,
  ): Promise<ProductDTO | null> {
    const product = await this.productService.updateProductStock(
      productId,
      quantity,
    );

    if (!product) return null;

    return toProductDTO(product);
  }
}
