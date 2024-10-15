import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { CartItem } from 'src/domain/entities/cart-item.entity';
import { ICartItemRepository } from 'src/domain/repositories/cart-item.repository';
import { CartItemDTO } from 'src/presentation/dtos/cart-item.dto';
import { fromCartItemDTO } from '../helper/to-entity/to.cart-item.entity';

/**
 * Service for managing cart items.
 * Implements business logic and interacts with the CartItem repository.
 */
@Injectable()
export class CartItemService {
  constructor(
    @Inject('ICartItemRepository')
    private readonly cartItemRepository: ICartItemRepository,
  ) {}

  /**
   * Creates a new CartItem.
   * @param cartItemDTO - The data transfer object containing cart item details.
   * @returns A promise that resolves to the created CartItem.
   */
  async createCartItem(cartItemDTO: CartItemDTO): Promise<CartItem> {
    const cartItem = fromCartItemDTO(cartItemDTO);
    return await this.cartItemRepository.create(cartItem);
  }

  /**
   * Retrieves a CartItem by its ID.
   * @param id - The unique ID of the CartItem.
   * @returns A promise that resolves to the CartItem if found, otherwise null.
   */
  async getCartItemById(id: number): Promise<CartItem | null> {
    return await this.cartItemRepository.getById(id);
  }

  /**
   * Updates an existing CartItem.
   * @param id - The unique ID of the CartItem to update.
   * @param cartItemDTO - The data transfer object with the updated details.
   * @returns A promise that resolves to the updated CartItem.
   */
  async updateCartItem(
    id: number,
    cartItemDTO: CartItemDTO,
  ): Promise<CartItem> {
    const updatedCartItem = fromCartItemDTO(cartItemDTO);
    return await this.cartItemRepository.update(id, updatedCartItem);
  }

  /**
   * Deletes a CartItem by its ID.
   * @param id - The unique ID of the CartItem to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async deleteCartItem(id: number): Promise<boolean> {
    return await this.cartItemRepository.remove(id);
  }

  /**
   * Retrieves all CartItems for a specific Cart.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to an array of CartItems.
   */
  async getCartItemsByCartId(cartId: number): Promise<CartItem[]> {
    return await this.cartItemRepository.getByCartId(cartId);
  }

  /**
   * Retrieves a CartItem by its Product ID and Cart ID.
   * @param productId - The unique ID of the Product.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to the CartItem if found, otherwise null.
   */
  async getCartItemByProductAndCart(
    productId: number,
    cartId: number,
  ): Promise<CartItem | null> {
    return await this.cartItemRepository.getByProductAndCart(productId, cartId);
  }

  /**
   * Updates the quantity of a CartItem.
   * @param id - The unique ID of the CartItem.
   * @param quantity - The new quantity to set.
   * @returns A promise that resolves to the updated CartItem.
   */
  async updateCartItemQuantity(
    id: number,
    quantity: number,
  ): Promise<CartItem> {
    return await this.cartItemRepository.updateQuantity(id, quantity);
  }

  /**
   * Removes all CartItems from a specific Cart.
   * @param cartId - The unique ID of the Cart to clear.
   * @returns A promise that resolves to true if all items were removed, otherwise false.
   */
  async clearCart(cartId: number): Promise<boolean> {
    return await this.cartItemRepository.clearCart(cartId);
  }

  /**
   * Calculates the total value of all CartItems in a specific Cart.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to the total value of the CartItems.
   */
  async calculateCartTotal(cartId: number): Promise<number> {
    return await this.cartItemRepository.calculateCartTotal(cartId);
  }

  /**
   * Retrieves the total count of CartItems in a specific Cart.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to the total value of the CartItems.
   */
  async getItemCount(cartId: number): Promise<number> {
    return await this.cartItemRepository.getItemCount(cartId);
  }

  /**
   * Retrieves the CartItem with the highest quantity in a specific Cart.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to the CartItem with the highest quantity, or null if no items are found.
   */
  async getHighestQuantityItem(cartId: number): Promise<CartItem | null> {
    return await this.cartItemRepository.getHighestQuantityItem(cartId);
  }
}
