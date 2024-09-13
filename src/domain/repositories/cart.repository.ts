import { CartItem } from "../entities/cart-item.entity";
import { Cart } from "../entities/cart.entity";

/**
 * Interface for managing carts with business rules.
 */
export interface ICartRepository {
  
  /**
   * Creates and stores a new Cart.
   * @param cart - The Cart entity to create.
   * @returns A promise that resolves to the created Cart.
   * @throws Error if the creation fails.
   */
  create(cart: Cart): Promise<Cart>;

  /**
   * Retrieves a Cart by its ID.
   * @param id - The unique ID of the Cart.
   * @returns A promise that resolves to the Cart if found, otherwise null.
   * @throws Error if the retrieval fails.
   */
  getById(id: number): Promise<Cart | null>;

  /**
   * Updates an existing Cart with new data.
   * @param id - The unique ID of the Cart to update.
   * @param data - The new data for the Cart.
   * @returns A promise that resolves to the updated Cart.
   * @throws Error if the update fails.
   */
  update(id: number, data: Partial<Cart>): Promise<Cart>;

  /**
   * Deletes a Cart by its ID.
   * @param id - The unique ID of the Cart to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if the deletion fails.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Adds an item to a specific Cart.
   * @param cartId - The unique ID of the Cart.
   * @param item - The CartItem to add.
   * @returns A promise that resolves to the updated Cart.
   * @throws Error if the addition fails.
   */
  addItem(cartId: number, item: CartItem): Promise<Cart>;

  /**
   * Removes an item from a specific Cart.
   * @param cartId - The unique ID of the Cart.
   * @param itemId - The unique ID of the CartItem to remove.
   * @returns A promise that resolves to the updated Cart.
   * @throws Error if the removal fails.
   */
  removeItem(cartId: number, itemId: number): Promise<Cart>;

  /**
   * Retrieves all items in a specific Cart.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to an array of CartItems.
   * @throws Error if the retrieval fails.
   */
  getItems(cartId: number): Promise<CartItem[]>;

  /**
   * Empties a Cart by removing all items.
   * @param cartId - The unique ID of the Cart to empty.
   * @returns A promise that resolves to the updated Cart.
   * @throws Error if the operation fails.
   */
  clear(cartId: number): Promise<Cart>;

  /**
   * Retrieves the Cart associated with a specific user.
   * @param userId - The unique ID of the user.
   * @returns A promise that resolves to the Cart associated with the user, or null if not found.
   * @throws Error if the retrieval fails.
   */
  getByUserId(userId: number): Promise<Cart | null>;

  /**
   * Merges items from one Cart into another.
   * @param sourceCartId - The ID of the Cart to merge items from.
   * @param targetCartId - The ID of the Cart to merge items into.
   * @returns A promise that resolves to the updated target Cart.
   * @throws Error if the merge operation fails.
   */
  mergeCarts(sourceCartId: number, targetCartId: number): Promise<Cart>;

  /**
   * Retrieves the total number of items in a Cart.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to the total item count.
   * @throws Error if the retrieval fails.
   */
  getItemCount(cartId: number): Promise<number>;

  /**
   * Retrieves the total value of items in a Cart.
   * @param cartId - The unique ID of the Cart.
   * @returns A promise that resolves to the total value.
   * @throws Error if the calculation fails.
   */
  getTotalValue(cartId: number): Promise<number>;
}
