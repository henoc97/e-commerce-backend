import { Injectable } from '@nestjs/common';
import { toProductDTO } from '../../../application/helper/to-dto/to.product.dto';
import ProductService from '../../../application/services/product.service';
import { CartItemDTO } from '../../../presentation/dtos/cart-item.dto';
import { ProductDTO } from '../../../presentation/dtos/product.dto';

/**
 * Use case class for adding a cart item to a product.
 */
@Injectable()
export class AddCartItemToProduct {
  constructor(private readonly productService: ProductService) { }

  /**
   * Executes the use case to add a cart item to a product.
   * @param productId - The unique ID of the product.
   * @param cartItemDTO - The cart item data to add.
   * @returns A promise that resolves to the updated Product DTO.
   */
  async execute(
    productId: number,
    cartItemDTO: CartItemDTO,
  ): Promise<ProductDTO | null> {
    const product = await this.productService.addCartItemToProduct(
      productId,
      cartItemDTO,
    );

    if (!product) return null;

    return toProductDTO(product);
  }
}
