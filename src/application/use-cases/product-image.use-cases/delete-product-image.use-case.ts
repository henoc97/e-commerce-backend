import { Injectable } from '@nestjs/common';
import { ProductImageService } from '../../../application/services/product-image.service';

/**
 * Use case class for deleting a product image.
 */
@Injectable()
export class DeleteProductImage {
  constructor(private readonly productImageService: ProductImageService) { }

  /**
   * Execute the delete-product-image use case.
   * @param id - The unique ID of the product image to delete.
   * @returns A promise that resolves to true if the deletion was successful, otherwise false.
   */
  async execute(id: number): Promise<boolean> {
    return this.productImageService.deleteProductImage(id);
  }
}
