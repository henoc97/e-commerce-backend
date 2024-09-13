import { OrderItem } from '../entities/order-item.enttity';

/**
 * Repository interface for managing OrderItems.
 * Defines CRUD operations and additional functionalities related to OrderItems.
 */
export interface IOrderItemRepository {
  /**
   * Creates a new OrderItem.
   * @param item - The OrderItem entity to create.
   * @returns A promise that resolves to the created OrderItem.
   * @throws Error if creation fails.
   */
  create(item: OrderItem): Promise<OrderItem>;

  /**
   * Retrieves an OrderItem by its unique ID.
   * @param id - The unique ID of the OrderItem.
   * @returns A promise that resolves to the OrderItem if found, otherwise null.
   * @throws Error if retrieval fails.
   */
  getById(id: number): Promise<OrderItem | null>;

  /**
   * Updates an existing OrderItem.
   * @param id - The unique ID of the OrderItem to update.
   * @param updates - Partial data for the update.
   * @returns A promise that resolves to the updated OrderItem.
   * @throws Error if update fails.
   */
  update(id: number, updates: Partial<OrderItem>): Promise<OrderItem>;

  /**
   * Deletes an OrderItem by its unique ID.
   * @param id - The unique ID of the OrderItem to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if deletion fails.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Retrieves all OrderItems for a specific Order.
   * @param orderId - The unique ID of the Order.
   * @returns A promise that resolves to an array of OrderItems for the Order.
   * @throws Error if retrieval fails.
   */
  getByOrderId(orderId: number): Promise<OrderItem[]>;

  /**
   * Retrieves all OrderItems for a specific Product.
   * @param productId - The unique ID of the Product.
   * @returns A promise that resolves to an array of OrderItems for the Product.
   * @throws Error if retrieval fails.
   */
  getByProductId(productId: number): Promise<OrderItem[]>;

  /**
   * Calculates the total price of OrderItems for a specific Order.
   * @param orderId - The unique ID of the Order.
   * @returns A promise that resolves to the total price.
   * @throws Error if calculation fails.
   */
  calculateTotalPrice(orderId: number): Promise<number>;

  /**
   * Retrieves the most recent OrderItems (e.g., from the last week) for a specific Order.
   * @param orderId - The unique ID of the Order.
   * @returns A promise that resolves to an array of recent OrderItems.
   * @throws Error if retrieval fails.
   */
  getRecentItems(orderId: number): Promise<OrderItem[]>;

  /**
   * Retrieves all OrderItems that have a quantity below a specified threshold.
   * @param threshold - The quantity threshold.
   * @returns A promise that resolves to an array of OrderItems below the threshold.
   * @throws Error if retrieval fails.
   */
  getLowStockItems(threshold: number): Promise<OrderItem[]>;
}
