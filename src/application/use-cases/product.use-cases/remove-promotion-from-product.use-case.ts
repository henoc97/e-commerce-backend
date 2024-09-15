import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/application/services/product.service';
import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { toProductDTO } from 'src/application/helper/to-dto/to.product.dto';

/**
 * Use case class for removing a promotion from a product.
 */
@Injectable()
export class RemovePromotionFromProduct {
  constructor(private readonly productService: ProductService) {}

  /**
   * Executes the use case to remove a promotion from a product.
   * @param productId - The unique ID of the product.
   * @param promotionId - The unique ID of the promotion to remove.
   * @returns A promise that resolves to the updated Product DTO.
   */
  async execute(
    productId: number,
    promotionId: number,
  ): Promise<ProductDTO | null> {
    const product = await this.productService.removePromotionFromProduct(
      productId,
      promotionId,
    );

    if (!product) return null;

    return toProductDTO(product);
  }
}
