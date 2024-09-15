import { Injectable } from '@nestjs/common';
import { toProductDTO } from 'src/application/helper/to-dto/to.product.dto';
import { ProductService } from 'src/application/services/product.service';
import { ProductDTO } from 'src/presentation/dtos/product.dto';

/**
 * Use case class for finding products within a specific price range.
 */
@Injectable()
export class FindProductsByPriceRange {
  constructor(private readonly productService: ProductService) {}

  /**
   * Executes the use case to find products by price range.
   * @param minPrice - The minimum price.
   * @param maxPrice - The maximum price.
   * @returns A promise that resolves to an array of Product DTOs within the price range.
   */
  async execute(minPrice: number, maxPrice: number): Promise<ProductDTO[]> {
    const products = await this.productService.findProductsByPriceRange(
      minPrice,
      maxPrice,
    );

    return products.map(toProductDTO);
  }
}
