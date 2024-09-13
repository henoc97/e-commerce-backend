import { Order } from '../entities/order.entity';
import { OrderStatus } from '../enums/order-status.enum';

/**
 * Repository interface for managing Order entities.
 * Provides methods for CRUD operations, status updates, and additional functionalities.
 */
export interface IOrderRepository {

    /**
     * Creates a new Order.
     * @param order - The Order entity to create.
     * @returns A promise that resolves to the created Order.
     * @throws Error if creation fails.
     */
    create(order: Order): Promise<Order>;

    /**
     * Retrieves an Order by its ID.
     * @param id - The unique ID of the Order.
     * @returns A promise that resolves to the Order if found, otherwise null.
     * @throws Error if retrieval fails.
     */
    getById(id: number): Promise<Order | null>;

    /**
     * Updates an existing Order.
     * @param id - The unique ID of the Order.
     * @param updates - The data to update.
     * @returns A promise that resolves to the updated Order.
     * @throws Error if update fails.
     */
    update(id: number, updates: Partial<Order>): Promise<Order>;

    /**
     * Deletes an Order by its ID.
     * @param id - The unique ID of the Order.
     * @returns A promise that resolves to true if deletion was successful, otherwise false.
     * @throws Error if deletion fails.
     */
    delete(id: number): Promise<boolean>;

    /**
     * Retrieves all Orders for a specific User.
     * @param userId - The unique ID of the User.
     * @returns A promise that resolves to an array of Orders for the User.
     * @throws Error if retrieval fails.
     */
    getByUserId(userId: number): Promise<Order[]>;

    /**
     * Retrieves all Orders for a specific Shop.
     * @param shopId - The unique ID of the Shop.
     * @returns A promise that resolves to an array of Orders for the Shop.
     * @throws Error if retrieval fails.
     */
    getByShopId(shopId: number): Promise<Order[]>;

    /**
     * Retrieves all Orders with a specific status.
     * @param status - The status of Orders to find.
     * @returns A promise that resolves to an array of Orders with the specified status.
     * @throws Error if retrieval fails.
     */
    getByStatus(status: OrderStatus): Promise<Order[]>;

    /**
     * Updates the status of an Order.
     * @param id - The unique ID of the Order.
     * @param status - The new status to set.
     * @returns A promise that resolves to the updated Order.
     * @throws Error if update fails.
     */
    updateStatus(id: number, status: OrderStatus): Promise<Order>;

    /**
     * Adds a payment to an Order.
     * @param orderId - The unique ID of the Order.
     * @param paymentId - The unique ID of the Payment.
     * @returns A promise that resolves to the updated Order.
     * @throws Error if addition fails.
     */
    addPayment(orderId: number, paymentId: string): Promise<Order>;

    /**
     * Adds a refund to an Order.
     * @param orderId - The unique ID of the Order.
     * @param refundId - The unique ID of the Refund.
     * @returns A promise that resolves to the updated Order.
     * @throws Error if addition fails.
     */
    addRefund(orderId: number, refundId: string): Promise<Order>;

    /**
     * Retrieves an Order by its tracking number.
     * @param trackingNumber - The tracking number of the Order.
     * @returns A promise that resolves to the Order if found, otherwise null.
     * @throws Error if retrieval fails.
     */
    getByTrackingNumber(trackingNumber: string): Promise<Order | null>;

    /**
     * Retrieves all Orders created within a specific date range.
     * @param startDate - The start date of the range.
     * @param endDate - The end date of the range.
     * @returns A promise that resolves to an array of Orders created within the date range.
     * @throws Error if retrieval fails.
     */
    getByDateRange(startDate: Date, endDate: Date): Promise<Order[]>;

    /**
     * Retrieves the most recent Orders for a specific Shop.
     * @param shopId - The unique ID of the Shop.
     * @param limit - The number of most recent Orders to retrieve.
     * @returns A promise that resolves to an array of the most recent Orders.
     * @throws Error if retrieval fails.
     */
    getRecentOrdersByShop(shopId: number, limit: number): Promise<Order[]>;

    /**
     * Retrieves the top N Orders with the highest total amounts.
     * @param topN - The number of top Orders to retrieve.
     * @returns A promise that resolves to an array of the top N Orders by total amount.
     * @throws Error if retrieval fails.
     */
    getTopOrdersByAmount(topN: number): Promise<Order[]>;
}
