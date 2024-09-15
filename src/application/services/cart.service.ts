import { Injectable } from '@nestjs/common';
import { CartItem } from 'src/domain/entities/cart-item.entity';
import { Cart } from 'src/domain/entities/cart.entity';
import { ICartRepository } from 'src/domain/repositories/cart.repository';
import { CartItemDTO } from 'src/presentation/dtos/cart-item.dto';
import { CartDTO } from 'src/presentation/dtos/cart.dto';
import { fromCartDTO } from '../helper/to-entity/to.cart.entity';
import { fromCartItemDTO } from '../helper/to-entity/to.cart-item.entity';

/**
 * Service for managing shopping carts and their operations.
 * Implements business logic and interacts with the Cart repository.
 */
@Injectable()
export class CartService {
  constructor(private readonly cartRepository: ICartRepository) {}

  /**
   * Creates a new Cart.
   * @param cartDTO - The data transfer object containing cart details.
   * @returns A promise that resolves to the created Cart.
   */
  async createCart(cartDTO: CartDTO): Promise<Cart> {
    const cart = fromCartDTO(cartDTO);
    return this.cartRepository.create(cart);
  }

  /**
   * Retrieves a Cart by its ID.
   * @param id - The unique ID of the Cart.
   * @returns A promise that resolves to the Cart if found, otherwise null.
   */
  async getCartById(id: number): Promise<Cart | null> {
    return this.cartRepository.getById(id);
  }

  /**
   * Updates an existing Cart with new data.
   * @param id - The unique ID of the Cart to update.
   * @param data - The new data for the Cart.
   * @returns A promise that resolves to the updated Cart.
   */
  async updateCart(id: number, data: Partial<CartDTO>): Promise<Cart> {
    const cart = fromCartDTO(data);
    return this.cartRepository.update(id, cart);
  }

  /**
   * Deletes a Cart by its ID.
   * @param id - The unique ID of the Cart to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async deleteCart(id: number): Promise<boolean> {
    return this.cartRepository.delete(id);
  }

  /**
   * Adds an item to a specific Cart.
   * @param cartId - The unique ID of the Cart.
   * @param item - The CartItem to add.
   * @returns A promise that resolves to the updated Cart.
   */
  async addItemToCart(cartId: number, item: CartItemDTO): Promise<Cart> {
    const cartItem = fromCartItemDTO(item);
    return this.cartRepository.addItem(cartId, cartItem);
  }

  /**
   * Removes an item from a specific Cart.
   * @param cartId - The unique ID of the Cart.
   * @param itemId - The unique ID of the CartItem to remove.
   * @returns A promise that resolves to the updated Cart.
   */
  async removeItemFromCart(cartId: number, itemId: number): Promise<Cart> {
    return this.cartRepository.removeItem(cartId, itemId);
  }

  /**
   * Retrieves all items in a specific Cart.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to an array of CartItems.
   */
  async getCartItems(cartId: number): Promise<CartItem[]> {
    return this.cartRepository.getItems(cartId);
  }

  /**
   * Empties a Cart by removing all items.
   * @param cartId - The unique ID of the Cart to empty.
   * @returns A promise that resolves to the updated Cart.
   */
  async clearCart(cartId: number): Promise<Cart> {
    return this.cartRepository.clear(cartId);
  }

  /**
   * Retrieves the Cart associated with a specific user.
   * @param userId - The unique ID of the user.
   * @returns A promise that resolves to the Cart associated with the user, or null if not found.
   */
  async getCartByUserId(userId: number): Promise<Cart | null> {
    return this.cartRepository.getByUserId(userId);
  }

  /**
   * Merges items from one Cart into another.
   * @param sourceCartId - The ID of the Cart to merge items from.
   * @param targetCartId - The ID of the Cart to merge items into.
   * @returns A promise that resolves to the updated target Cart.
   */
  async mergeCarts(sourceCartId: number, targetCartId: number): Promise<Cart> {
    return this.cartRepository.mergeCarts(sourceCartId, targetCartId);
  }

  /**
   * Retrieves the total number of items in a Cart.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to the total item count.
   */
  async getItemCount(cartId: number): Promise<number> {
    return this.cartRepository.getItemCount(cartId);
  }

  /**
   * Retrieves the total value of items in a Cart.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to the total value.
   */
  async getTotalValue(cartId: number): Promise<number> {
    return this.cartRepository.getTotalValue(cartId);
  }
}
