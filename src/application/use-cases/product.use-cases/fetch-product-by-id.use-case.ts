import { Injectable } from '@nestjs/common';
import { toProductDTO } from '../../../application/helper/to-dto/to.product.dto';
import ProductService from '../../../application/services/product.service';
import { ProductDTO } from '../../../presentation/dtos/product.dto';

/**
 * Use case class for fetching a product by its unique ID.
 */
@Injectable()
export class FetchProductById {
  constructor(private readonly productService: ProductService) { }

  /**
   * Executes the use case to fetch a product by ID.
   * @param productId - The unique ID of the product.
   * @returns A promise that resolves to the Product DTO if found, otherwise null.
   */
  async execute(productId: number): Promise<ProductDTO | null> {
    const product = await this.productService.getProductById(productId);

    if (!product) return null;

    return toProductDTO(product);
  }
}
