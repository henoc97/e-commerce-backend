import { Injectable } from '@nestjs/common';
import ProductService from '../../../application/services/product.service';
import { ProductDTO } from '../../../presentation/dtos/product.dto';
import { toProductDTO } from '../../../application/helper/to-dto/to.product.dto';

/**
 * Use case class for removing a variant from a product.
 */
@Injectable()
export class RemoveVariantFromProduct {
  constructor(private readonly productService: ProductService) { }

  /**
   * Executes the use case to remove a variant from a product.
   * @param productId - The unique ID of the product.
   * @param variantId - The unique ID of the variant to remove.
   * @returns A promise that resolves to the updated Product DTO.
   */
  async execute(
    productId: number,
    variantId: number,
  ): Promise<ProductDTO | null> {
    const product = await this.productService.removeVariantFromProduct(
      productId,
      variantId,
    );

    if (!product) return null;

    return toProductDTO(product);
  }
}
