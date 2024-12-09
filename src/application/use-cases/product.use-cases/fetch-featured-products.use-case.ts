import { Injectable } from '@nestjs/common';
import { toProductDTO } from '../../../application/helper/to-dto/to.product.dto';
import ProductService from '../../../application/services/product.service';
import { ProductDTO } from '../../../presentation/dtos/product.dto';

/**
 * Use case class for fetching featured products.
 */
@Injectable()
export class FetchFeaturedProducts {
  constructor(private readonly productService: ProductService) { }

  /**
   * Executes the use case to fetch featured products.
   * @returns A promise that resolves to an array of Product DTOs.
   */
  async execute(): Promise<ProductDTO[]> {
    const products = await this.productService.getFeaturedProducts();
    return products?.map(toProductDTO);
  }
}
