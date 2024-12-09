import { Injectable } from '@nestjs/common';
import { CartService } from '../../../application/services/cart.service';
import { CartDTO } from '../../../presentation/dtos/cart.dto';
import { toCartDTO } from '../../../application/helper/to-dto/to.cart.dto';

@Injectable()
export class FetchCartByUserId {
  constructor(private readonly cartService: CartService) { }

  /**
   * Retrieves all carts associated with a specific user ID.
   * @param userId - The ID of the user for whom to retrieve carts.
   * @returns A promise that resolves to an array of CartDTO.
   */
  async execute(userId: number): Promise<CartDTO[]> {
    const carts = await this.cartService.getCartByUserId(userId);
    return carts?.map(toCartDTO);
  }
}
