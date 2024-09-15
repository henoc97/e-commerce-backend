import { Injectable } from '@nestjs/common';
import { toProductDTO } from 'src/application/helper/to-dto/to.product.dto';
import { ProductService } from 'src/application/services/product.service';
import { ProductDTO } from 'src/presentation/dtos/product.dto';
import { PromotionDTO } from 'src/presentation/dtos/promotion.dto';

/**
 * Use case class for adding a promotion to a product.
 */
@Injectable()
export class AddPromotionToProduct {
  constructor(private readonly productService: ProductService) {}

  /**
   * Executes the use case to add a promotion to a product.
   * @param productId - The unique ID of the product.
   * @param promotionDTO - The promotion data to add.
   * @returns A promise that resolves to the updated Product DTO.
   */
  async execute(
    productId: number,
    promotionDTO: PromotionDTO,
  ): Promise<ProductDTO | null> {
    const product = await this.productService.addPromotionToProduct(
      productId,
      promotionDTO,
    );

    if (!product) return null;

    return toProductDTO(product);
  }
}
