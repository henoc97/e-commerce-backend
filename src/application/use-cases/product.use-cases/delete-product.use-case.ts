import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/application/services/product.service';

/**
 * Use case class for deleting a product.
 */
@Injectable()
export class DeleteProduct {
  constructor(private readonly productService: ProductService) {}

  /**
   * Executes the use case to delete a product.
   * @param productId - The unique ID of the product to delete.
   * @returns A promise that resolves to true if the product was deleted, otherwise false.
   */
  async execute(productId: number): Promise<boolean> {
    return this.productService.deleteProduct(productId);
  }
}
