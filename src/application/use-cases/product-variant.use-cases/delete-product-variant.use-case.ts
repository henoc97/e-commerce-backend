import { Injectable } from '@nestjs/common';
import { ProductVariantService } from '../../../application/services/product-variant.service';

/**
 * Use case class for deleting a product variant.
 * This class encapsulates the business logic for removing a variant.
 * It interacts with the ProductVariant service to perform operations on product variant repository.
 */
@Injectable()
export class DeleteProductVariant {
  constructor(private readonly service: ProductVariantService) { }

  /**
   * Execute the delete-product-variant use case.
   * @param id - The unique ID of the ProductVariant to be deleted.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async execute(id: number): Promise<boolean> {
    return this.service.deleteProductVariant(id);
  }
}
