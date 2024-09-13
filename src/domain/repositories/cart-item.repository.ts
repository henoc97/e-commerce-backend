import { CartItem } from '../entities/cart-item.entity';

/**
 * Interface for managing cart items with business rules.
 */
export interface ICartItemRepository {
  /**
   * Creates and stores a new CartItem.
   * @param item - The CartItem entity to be created.
   * @returns A promise that resolves to the created CartItem.
   * @throws Error if the creation fails.
   */
  create(item: CartItem): Promise<CartItem>;

  /**
   * Retrieves a CartItem by its ID.
   * @param id - The unique ID of the CartItem.
   * @returns A promise that resolves to the CartItem if found, otherwise null.
   * @throws Error if the retrieval fails.
   */
  getById(id: number): Promise<CartItem | null>;

  /**
   * Updates an existing CartItem.
   * @param id - The unique ID of the CartItem to update.
   * @param data - The new data to update the CartItem with.
   * @returns A promise that resolves to the updated CartItem.
   * @throws Error if the update fails.
   */
  update(id: number, data: Partial<CartItem>): Promise<CartItem>;

  /**
   * Deletes a CartItem by its ID.
   * @param id - The unique ID of the CartItem to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if the deletion fails.
   */
  remove(id: number): Promise<boolean>;

  /**
   * Retrieves all CartItems for a specific Cart.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to an array of CartItems.
   * @throws Error if the retrieval fails.
   */
  getByCartId(cartId: number): Promise<CartItem[]>;

  /**
   * Retrieves a CartItem by its Product ID and Cart ID.
   * @param productId - The unique ID of the Product.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to the CartItem if found, otherwise null.
   * @throws Error if the retrieval fails.
   */
  getByProductAndCart(
    productId: number,
    cartId: number,
  ): Promise<CartItem | null>;

  /**
   * Updates the quantity of a CartItem.
   * @param id - The unique ID of the CartItem.
   * @param quantity - The new quantity to set for the CartItem.
   * @returns A promise that resolves to the updated CartItem.
   * @throws Error if the update fails.
   */
  updateQuantity(id: number, quantity: number): Promise<CartItem>;

  /**
   * Removes all CartItems from a specific Cart.
   * @param cartId - The unique ID of the Cart to clear.
   * @returns A promise that resolves to true if all items were removed, otherwise false.
   * @throws Error if the removal fails.
   */
  clearCart(cartId: number): Promise<boolean>;

  /**
   * Calculates the total value of all CartItems in a specific Cart.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to the total value of the CartItems.
   * @throws Error if the calculation fails.
   */
  calculateCartTotal(cartId: number): Promise<number>;

  /**
   * Retrieves the CartItem with the highest quantity in a specific Cart.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to the CartItem with the highest quantity, or null if no items are found.
   * @throws Error if the retrieval fails.
   */
  getHighestQuantityItem(cartId: number): Promise<CartItem | null>;
}
