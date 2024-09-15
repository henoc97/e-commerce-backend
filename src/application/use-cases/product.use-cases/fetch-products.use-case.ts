import { Injectable } from '@nestjs/common';
import { toProductDTO } from 'src/application/helper/to-dto/to.product.dto';
import { ProductService } from 'src/application/services/product.service';
import { ProductDTO } from 'src/presentation/dtos/product.dto';

/**
 * Use case class for fetching a list of products.
 */
@Injectable()
export class FetchProducts {
  constructor(private readonly productService: ProductService) {}

  /**
   * Executes the use case to fetch a list of products.
   * @returns A promise that resolves to an array of Product DTOs.
   */
  async execute(): Promise<ProductDTO[]> {
    const products = await this.productService.getProducts();
    return products.map(toProductDTO);
  }
}
