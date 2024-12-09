import { Injectable } from '@nestjs/common';
import { toProductDTO } from '../../../application/helper/to-dto/to.product.dto';
import ProductService from '../../../application/services/product.service';
import { ProductVariantDTO } from '../../../presentation/dtos/product-variant.dto';
import { ProductDTO } from '../../../presentation/dtos/product.dto';

/**
 * Use case class for adding a variant to a product.
 */
@Injectable()
export class AddVariantToProduct {
  constructor(private readonly productService: ProductService) { }

  /**
   * Executes the use case to add a variant to a product.
   * @param productId - The unique ID of the product.
   * @param variantDTO - The variant data to add.
   * @returns A promise that resolves to the updated Product DTO.
   */
  async execute(
    productId: number,
    variantDTO: ProductVariantDTO,
  ): Promise<ProductDTO | null> {
    const product = await this.productService.addVariantToProduct(
      productId,
      variantDTO,
    );

    if (!product) return null;

    return toProductDTO(product);
  }
}
