import { Injectable } from '@nestjs/common';
import { toProductDTO } from 'src/application/helper/to-dto/to.product.dto';
import { ProductService } from 'src/application/services/product.service';
import { ProductDTO } from 'src/presentation/dtos/product.dto';

/**
 * Use case class for creating a new product.
 */
@Injectable()
export class CreateProduct {
  constructor(private readonly productService: ProductService) {}

  /**
   * Executes the use case to create a new product.
   * @param productDTO - The product data to create.
   * @returns A promise that resolves to the created Product DTO.
   */
  async execute(productDTO: ProductDTO): Promise<ProductDTO | null> {
    const product = await this.productService.createProduct(productDTO);

    if (!product) return null;

    return toProductDTO(product);
  }
}
