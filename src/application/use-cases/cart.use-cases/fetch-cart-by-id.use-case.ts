import { Injectable } from '@nestjs/common';
import { toCartDTO } from '../../../application/helper/to-dto/to.cart.dto';
import { CartService } from '../../../application/services/cart.service';
import { CartDTO } from '../../../presentation/dtos/cart.dto';

/**
 * Use case class for fetching a cart by its ID.
 * This class encapsulates the business logic for retrieving a specific cart.
 * It interacts with the Cart service to perform operations on the cart repository.
 */
@Injectable()
export class FetchCartById {
  constructor(private readonly cartService: CartService) { }

  /**
   * Executes the fetch-cart-by-id use case.
   * @param id - The ID of the cart to be fetched.
   * @returns A promise that resolves to the Cart if found, otherwise null.
   */
  async execute(id: number): Promise<CartDTO | null> {
    const cart = await this.cartService.getCartById(id);
    return cart ? toCartDTO(cart) : null;
  }
}
