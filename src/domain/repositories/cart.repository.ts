import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';

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
   * Retrieves the Carts associated with a specific user.
   * @param userId - The unique ID of the user.
   * @returns A promise that resolves to the Cart associated with the user.
   * @throws Error if the retrieval fails.
   */
  getByUserId(userId: number): Promise<Cart[]>;
}
