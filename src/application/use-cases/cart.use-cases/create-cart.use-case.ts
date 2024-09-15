import { Injectable } from '@nestjs/common';
import { toCartDTO } from 'src/application/helper/to-dto/to.cart.dto';
import { CartService } from 'src/application/services/cart.service';
import { CartDTO } from 'src/presentation/dtos/cart.dto';

/**
 * Use case class for creating a new cart.
 * This class encapsulates the business logic for creating a new cart.
 * It interacts with the Cart service to perform operations on the cart repository.
 */
@Injectable()
export class CreateCart {
  constructor(private readonly cartService: CartService) {}

  /**
   * Executes the create-cart use case.
   * @param cartDTO - The CartDTO containing the cart data to be created.
   * @returns A promise that resolves to the created Cart.
   */
  async execute(cartDTO: CartDTO): Promise<CartDTO> {
    const cart = await this.cartService.createCart(cartDTO);
    return toCartDTO(cart);
  }
}
