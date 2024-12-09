import { Injectable } from '@nestjs/common';
import { toCartDTO } from '../../../application/helper/to-dto/to.cart.dto';
import { CartService } from '../../../application/services/cart.service';
import { CartItemDTO } from '../../../presentation/dtos/cart-item.dto';
import { CartDTO } from '../../../presentation/dtos/cart.dto';

/**
 * Use case class for adding an item to the cart.
 * This class encapsulates the business logic for adding a specific item to the cart.
 * It interacts with the Cart service to perform operations on the cart repository.
 */
@Injectable()
export class AddItemToCart {
  constructor(private readonly cartService: CartService) { }

  /**
   * Executes the add-item-to-cart use case.
   * @param cartId - The ID of the cart where the item will be added.
   * @param itemDTO - The CartItemDTO containing the item data to be added.
   * @returns A promise that resolves to the updated Cart.
   */
  async execute(cartId: number, itemDTO: CartItemDTO): Promise<CartDTO> {
    const cart = await this.cartService.addItemToCart(cartId, itemDTO);
    return toCartDTO(cart);
  }
}
