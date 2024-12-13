import { Injectable } from '@nestjs/common';
import { toCartItemDTO } from '../../../application/helper/to-dto/to.cart-item.dto';
import { CartItemService } from '../../../application/services/cart-item.service';
import { CartItemDTO } from '../../../presentation/dtos/cart-item.dto';
import { UpdateCart } from '../cart.use-cases/update-cart.use-case';
import { FetchCartById } from '../cart.use-cases/fetch-cart-by-id.use-case';
import { CartDTO } from '../../../presentation/dtos/cart.dto';

/**
 * Use case class for creating a new cart item.
 */
@Injectable()
export class CreateCartItem {
  constructor(
    private readonly cartItemService: CartItemService,
    private readonly updateCart: UpdateCart,
  ) { }

  /**
   * Executes the create-cart-item use case.
   * @param cartItemDTO - The CartItemDTO containing the item data to be created.
   * @returns A promise that resolves to the created CartItem.
   */
  async execute(cartItemDTO: CartItemDTO): Promise<CartItemDTO> {
    const cartItem = await this.cartItemService.createCartItem(cartItemDTO);

    if (cartItem) {
      const data = {
        "totalPrice": cartItem.cart.totalPrice + cartItem.product.price * cartItem.quantity,
        "totalQuantity": cartItem.cart.totalQuantity + cartItem.quantity,
        "estimatedShippingCost": 0.0
      }
      const cart: CartDTO = await this.updateCart.execute(cartItem.cart.id, data)
    }
    return toCartItemDTO(cartItem);
  }
}
