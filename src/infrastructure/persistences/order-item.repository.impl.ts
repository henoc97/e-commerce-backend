import { fromOrderItemPrisma } from '../../application/helper/from-prisma/to.order-item.entity';
import { OrderItem } from '../../domain/entities/order-item.enttity';
import { IOrderItemRepository } from '../../domain/repositories/order-item.repository';
import prisma from '../../../prisma/prisma.service';

/**
 * Repository class for handling operations related to OrderItems.
 * Implements methods for creating, retrieving, updating, and deleting order items.
 */
export class OrderItemRepository implements IOrderItemRepository {


  /**
   * Creates a new order item in the database.
   * @param item - The OrderItem to be created.
   * @returns The created OrderItem.
   */
  async create(item: OrderItem): Promise<OrderItem> {
    try {
      const { id, order, product, ...data } = item;
      const result = await prisma.orderItem.create({
        data: data,
      });
      return fromOrderItemPrisma(result);
    } catch (error) {
      console.error('Error creating order item:', error);
      throw error;
    }
  }

  /**
   * Retrieves an OrderItem by its ID.
   * @param id - The ID of the OrderItem.
   * @returns The OrderItem or null if not found.
   */
  async getById(id: number): Promise<OrderItem | null> {
    try {
      const result = await prisma.orderItem.findUnique({
        where: { id },
      });
      return fromOrderItemPrisma(result);
    } catch (error) {
      console.error('Error retrieving order item by ID:', error);
      throw error;
    }
  }

  /**
   * Updates an existing OrderItem in the database.
   * @param id - The ID of the OrderItem to update.
   * @param updates - The partial updates to apply to the OrderItem.
   * @returns The updated OrderItem.
   */
  async update(id: number, updates: Partial<OrderItem>): Promise<OrderItem> {
    try {
      const { id, product, order, ...data } = updates;
      const result = await prisma.orderItem.update({
        where: { id },
        data: data,
      });
      return fromOrderItemPrisma(result);
    } catch (error) {
      console.error('Error updating order item:', error);
      throw error;
    }
  }

  /**
   * Deletes an OrderItem by its ID.
   * @param id - The ID of the OrderItem to delete.
   * @returns True if the deletion was successful, otherwise false.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.orderItem.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting order item:', error);
      return false;
    }
  }

  /**
   * Retrieves all OrderItems associated with a specific order.
   * @param orderId - The ID of the order.
   * @returns A list of OrderItems for the specified order.
   */
  async getByOrderId(orderId: number): Promise<OrderItem[]> {
    try {
      const result = await prisma.orderItem.findMany({
        where: { orderId },
      });
      return result?.map(fromOrderItemPrisma);
    } catch (error) {
      console.error('Error retrieving order items by order ID:', error);
      throw error;
    }
  }

  /**
   * Retrieves all OrderItems that include a specific product.
   * @param productId - The ID of the product.
   * @returns A list of OrderItems containing the product.
   */
  async getByProductId(productId: number): Promise<OrderItem[]> {
    try {
      const result = await prisma.orderItem.findMany({
        where: { productId },
      });
      return result?.map(fromOrderItemPrisma);
    } catch (error) {
      console.error('Error retrieving order items by product ID:', error);
      throw error;
    }
  }

  /**
   * Calculates the total price of all items in an order.
   * @param orderId - The ID of the order.
   * @returns The total price of all items in the order.
   */
  async calculateTotalPrice(orderId: number): Promise<number> {
    try {
      const items = await prisma.orderItem.findMany({
        where: { orderId },
      });
      return items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    } catch (error) {
      console.error('Error calculating total price:', error);
      throw error;
    }
  }

  /**
   * Retrieves recent items from a specific order.
   * @param orderId - The ID of the order.
   * @returns A list of recent OrderItems from the specified order.
   */
  async getRecentItems(orderId: number): Promise<OrderItem[]> {
    try {
      const result = await prisma.orderItem.findMany({
        where: { orderId },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
      return result?.map(fromOrderItemPrisma);
    } catch (error) {
      console.error('Error retrieving recent order items:', error);
      throw error;
    }
  }

  /**
   * Retrieves items with stock levels below the specified threshold.
   * @param threshold - The stock quantity threshold.
   * @returns A list of OrderItems with low stock.
   */
  async getLowStockItems(threshold: number): Promise<OrderItem[]> {
    try {
      const result = await prisma.orderItem.findMany({
        where: { quantity: { lt: threshold } },
      });
      return result?.map(fromOrderItemPrisma);
    } catch (error) {
      console.error('Error retrieving low stock items:', error);
      throw error;
    }
  }
}
