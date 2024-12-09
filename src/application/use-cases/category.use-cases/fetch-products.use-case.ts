import { Injectable } from '@nestjs/common';
import { toProductDTO } from '../../../application/helper/to-dto/to.product.dto';
import { CategoryService } from '../../../application/services/category.service';
import { ProductDTO } from '../../../presentation/dtos/product.dto';

/**
 * Use case class for fetching products in a category.
 * This class encapsulates the business logic for retrieving products within a category.
 * It interacts with the Category service to perform operations on the product repository.
 */
@Injectable()
export class FetchProducts {
  constructor(private readonly service: CategoryService) { }

  /**
   * Execute the fetch-products use case.
   * @param categoryId - The ID of the category to retrieve products from.
   * @returns A promise that resolves to an array of ProductDTO representing the products.
   */
  async execute(categoryId: number): Promise<ProductDTO[]> {
    const products = await this.service.getProducts(categoryId);

    return products?.map((product) => toProductDTO(product));
  }
}
