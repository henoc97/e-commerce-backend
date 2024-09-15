import { Injectable } from '@nestjs/common';
import { toProductDTO } from 'src/application/helper/to-dto/to.product.dto';
import { ProductService } from 'src/application/services/product.service';
import { ProductDTO } from 'src/presentation/dtos/product.dto';

/**
 * Use case class for finding products by name.
 */
@Injectable()
export class FindProductsByName {
  constructor(private readonly productService: ProductService) {}

  /**
   * Executes the use case to find products by name.
   * @param name - The name of the product.
   * @returns A promise that resolves to an array of Product DTOs matching the name.
   */
  async execute(name: string): Promise<ProductDTO[]> {
    const products = await this.productService.findProductsByName(name);

    return products.map(toProductDTO);
  }
}
