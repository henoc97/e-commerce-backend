import { Injectable } from '@nestjs/common';
import { toProductDTO } from 'src/application/helper/to-dto/to.product.dto';
import ProductService from 'src/application/services/product.service';
import { ProductDTO } from 'src/presentation/dtos/product.dto';

/**
 * Use case class for finding products by category.
 */
@Injectable()
export class FindProductsByCategory {
  constructor(private readonly productService: ProductService) {}

  /**
   * Executes the use case to find products by category.
   * @param categoryId - The unique ID of the category.
   * @returns A promise that resolves to an array of Product DTOs within the category.
   */
  async execute(categoryId: number): Promise<ProductDTO[]> {
    const products =
      await this.productService.findProductsByCategory(categoryId);

    return products.map(toProductDTO);
  }
}
