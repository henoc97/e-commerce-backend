import { Injectable } from '@nestjs/common';
import { toCartItemDTO } from 'src/application/helper/to-dto/to.cart-item.dto';
import { CartItemService } from 'src/application/services/cart-item.service';
import { CartItemDTO } from 'src/presentation/dtos/cart-item.dto';

/**
 * Use case class for retrieving a cart item by its product ID and cart ID.
 */
@Injectable()
export class FetchCartItemByProductAndCart {
  constructor(private readonly cartItemService: CartItemService) {}

  /**
   * Executes the fetch-cart-item-by-product-and-cart use case.
   * @param productId - The unique ID of the product.
   * @param cartId - The unique ID of the cart.
   * @returns A promise that resolves to the CartItemDTO if found, otherwise null.
   */
  async execute(
    productId: number,
    cartId: number,
  ): Promise<CartItemDTO | null> {
    const cartItem = await this.cartItemService.getCartItemByProductAndCart(
      productId,
      cartId,
    );
    return cartItem ? toCartItemDTO(cartItem) : null;
  }
}
