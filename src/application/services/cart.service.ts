import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { CartItem } from 'src/domain/entities/cart-item.entity';
import { Cart } from 'src/domain/entities/cart.entity';
import { ICartRepository } from 'src/domain/repositories/cart.repository';
import { CartItemDTO } from 'src/presentation/dtos/cart-item.dto';
import { CartDTO } from 'src/presentation/dtos/cart.dto';
import { fromCartDTO } from '../helper/to-entity/to.cart.entity';
import { CartItemService } from './cart-item.service';

@Injectable()
export class CartService {
  constructor(
    @Inject('ICartRepository') 
    private readonly cartRepository: ICartRepository,
    private readonly cartItemService: CartItemService,
  ) {}

  /**
   * Creates a new cart.
   * @param cartDTO The data transfer object containing cart information.
   * @returns The created cart entity.
   * @throws InternalServerErrorException if an error occurs while creating the cart.
   */
  async createCart(cartDTO: CartDTO): Promise<Cart> {
    const cart = fromCartDTO(cartDTO);
    return await this.cartRepository.create(cart);
  }

  /**
   * Retrieves a cart by its ID.
   * @param id The ID of the cart to retrieve.
   * @returns The cart entity or null if not found.
   * @throws InternalServerErrorException if an error occurs while retrieving the cart.
   */
  async getCartById(id: number): Promise<Cart | null> {
    return await this.cartRepository.getById(id);
  }

  /**
   * Updates an existing cart.
   * @param id The ID of the cart to update.
   * @param data The partial cart data to update.
   * @returns The updated cart entity.
   * @throws InternalServerErrorException if an error occurs while updating the cart.
   */
  async updateCart(id: number, data: Partial<CartDTO>): Promise<Cart> {
    const cart = fromCartDTO(data);
    return await this.cartRepository.update(id, cart);
  }

  /**
   * Deletes a cart by its ID.
   * @param id The ID of the cart to delete.
   * @returns A boolean indicating success or failure.
   * @throws InternalServerErrorException if an error occurs while deleting the cart.
   */
  async deleteCart(id: number): Promise<boolean> {
    return await this.cartRepository.delete(id);
  }

  /**
   * Adds an item to a specified cart.
   * @param cartId The ID of the cart to which the item will be added.
   * @param item The data transfer object for the cart item.
   * @returns The updated cart entity.
   * @throws InternalServerErrorException if an error occurs while adding the item to the cart.
   */
  async addItemToCart(cartId: number, item: CartItemDTO): Promise<Cart> {
    await this.cartItemService.createCartItem(item);
    return await this.cartRepository.getById(cartId);
  }

  /**
   * Removes an item from a specified cart.
   * @param cartId The ID of the cart from which the item will be removed.
   * @param itemId The ID of the item to remove.
   * @returns The updated cart entity.
   * @throws InternalServerErrorException if an error occurs while removing the item from the cart.
   */
  async removeItemFromCart(cartId: number, itemId: number): Promise<Cart> {
    await this.cartItemService.deleteCartItem(itemId);
    return await this.cartRepository.getById(cartId);
  }

  /**
   * Retrieves all items in a specified cart.
   * @param cartId The ID of the cart for which to retrieve items.
   * @returns An array of cart items.
   * @throws InternalServerErrorException if an error occurs while retrieving cart items.
   */
  async getCartItems(cartId: number): Promise<CartItem[]> {
    return await this.cartItemService.getCartItemsByCartId(cartId);
  }

  /**
   * Clears all items from a specified cart.
   * @param cartId The ID of the cart to clear.
   * @returns The updated cart entity.
   * @throws InternalServerErrorException if an error occurs while clearing items from the cart.
   */
  async clearCart(cartId: number): Promise<Cart> {
    await this.cartItemService.clearCart(cartId);
    return await this.cartRepository.getById(cartId);
  }

  /**
   * Retrieves all carts associated with a specific user ID.
   * @param userId The ID of the user for whom to retrieve carts.
   * @returns An array of cart entities.
   * @throws InternalServerErrorException if an error occurs while retrieving carts by user ID.
   */
  async getCartByUserId(userId: number): Promise<Cart[]> {
    return await this.cartRepository.getByUserId(userId);
  }

  /**
   * Merges items from one cart into another and deletes the source cart.
   * @param sourceCartId The ID of the cart to merge items from.
   * @param targetCartId The ID of the cart to merge items into.
   * @returns The updated target cart entity.
   * @throws InternalServerErrorException if an error occurs while merging carts.
   */
  async mergeCarts(sourceCartId: number, targetCartId: number): Promise<Cart> {
    const sourceItems =
      await this.cartItemService.getCartItemsByCartId(sourceCartId);
    for (const item of sourceItems) {
      const dto = new CartItemDTO(
        targetCartId,
        item.productId,
        item.quantity,
      );
      await this.cartItemService.createCartItem(dto);
    }
    await this.cartRepository.delete(sourceCartId);
    return await this.cartRepository.getById(targetCartId);
  }

  /**
   * Retrieves the item count in a specified cart.
   * @param cartId The ID of the cart for which to get the item count.
   * @returns The number of items in the cart.
   * @throws InternalServerErrorException if an error occurs while getting the item count.
   */
  async getItemCount(cartId: number): Promise<number> {
    return await this.cartItemService.getItemCount(cartId);
  }

  /**
   * Calculates the total value of a specified cart.
   * @param cartId The ID of the cart for which to calculate the total value.
   * @returns The total value of the cart.
   * @throws InternalServerErrorException if an error occurs while calculating the total value.
   */
  async getTotalValue(cartId: number): Promise<number> {
    return await this.cartItemService.calculateCartTotal(cartId);
  }
}
