import { Injectable } from '@nestjs/common';
import { CartService } from '../../../application/services/cart.service';
import { CartDTO } from '../../../presentation/dtos/cart.dto';
import { toCartDTO } from '../../../application/helper/to-dto/to.cart.dto';

@Injectable()
export class UpdateCart {
  constructor(private readonly cartService: CartService) { }

  /**
   * Updates an existing cart with the provided data.
   * @param cartId - The ID of the cart to update.
   * @param data - The partial cart data to update.
   * @returns A promise that resolves to the updated CartDTO.
   */
  async execute(cartId: number, data: Partial<CartDTO>): Promise<CartDTO> {
    const cart = await this.cartService.updateCart(cartId, data);
    return toCartDTO(cart);
  }
}
