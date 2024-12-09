import { fromOrderPrisma } from '../../application/helper/from-prisma/to.order.entity';
import { Order } from '../../domain/entities/order.entity';
import { OrderStatus } from '../../domain/enums/order-status.enum';
import { IOrderRepository } from '../../domain/repositories/order.repository';
import prisma from '../../../prisma/prisma.service';

/**
 * Represents the Order repository responsible for handling order-related database operations.
 */
export class OrderRepository implements IOrderRepository {

  getAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }

  /**
   * Creates a new order in the database.
   * @param order - The order to be created.
   * @returns The created order.
   * @throws Error if the creation fails.
   */
  async create(order: Order): Promise<Order> {
    try {
      const { id, user, shop, items, shipment, payments, refunds, ...data } =
        order;
      const createdOrder = await prisma.order.create({
        data: data,
      });
      return fromOrderPrisma(createdOrder);
    } catch (error) {
      throw new Error(`Failed to create order: ${error}`);
    }
  }

  /**
   * Retrieves an order by its ID.
   * @param id - The ID of the order to retrieve.
   * @returns The found order or null if not found.
   * @throws Error if the retrieval fails.
   */
  async getById(id: number): Promise<Order | null> {
    try {
      const order = await prisma.order.findUnique({
        where: { id },
      });
      return fromOrderPrisma(order);
    } catch (error) {
      throw new Error(
        `Failed to retrieve order with ID ${id}: ${error}`,
      );
    }
  }

  /**
   * Updates an existing order with new data.
   * @param id - The ID of the order to update.
   * @param updates - The updates to apply to the order.
   * @returns The updated order.
   * @throws Error if the update fails.
   */
  async update(id: number, updates: Partial<Order>): Promise<Order> {
    try {
      const { user, shop, items, shipment, payments, refunds, ...data } =
        updates;
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: data,
      });
      return fromOrderPrisma(updatedOrder);
    } catch (error) {
      throw new Error(`Failed to update order with ID ${id}: ${error}`);
    }
  }

  /**
   * Deletes an order by its ID.
   * @param id - The ID of the order to delete.
   * @returns True if the deletion was successful, false otherwise.
   * @throws Error if the deletion fails.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.order.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error(`Failed to delete order with ID ${id}: ${error}`);
      return false;
    }
  }

  /**
   * Retrieves orders placed by a specific user.
   * @param userId - The ID of the user.
   * @returns A list of orders associated with the user.
   * @throws Error if the retrieval fails.
   */
  async getByUserId(userId: number): Promise<Order[]> {
    try {
      const orders = await prisma.order.findMany({
        where: { userId },
      });
      return orders?.map(fromOrderPrisma);
    } catch (error) {
      throw new Error(
        `Failed to retrieve orders for user with ID ${userId}: ${error}`,
      );
    }
  }

  /**
   * Retrieves orders associated with a specific shop.
   * @param shopId - The ID of the shop.
   * @returns A list of orders associated with the shop.
   * @throws Error if the retrieval fails.
   */
  async getByShopId(shopId: number): Promise<Order[]> {
    try {
      const orders = await prisma.order.findMany({
        where: { shopId },
      });
      return orders?.map(fromOrderPrisma);
    } catch (error) {
      throw new Error(
        `Failed to retrieve orders for shop with ID ${shopId}: ${error}`,
      );
    }
  }

  /**
   * Retrieves orders based on their status.
   * @param status - The status of the orders to retrieve.
   * @returns A list of orders with the specified status.
   * @throws Error if the retrieval fails.
   */
  async getByStatus(status: OrderStatus): Promise<Order[]> {
    try {
      const orders = await prisma.order.findMany({
        where: { status },
      });
      return orders?.map(fromOrderPrisma);
    } catch (error) {
      throw new Error(
        `Failed to retrieve orders with status ${status}: ${error}`,
      );
    }
  }

  /**
   * Updates the status of a specific order.
   * @param id - The ID of the order to update.
   * @param status - The new status for the order.
   * @returns The updated order.
   * @throws Error if the update fails.
   */
  async updateStatus(id: number, status: OrderStatus): Promise<Order> {
    try {
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: { status },
      });
      return fromOrderPrisma(updatedOrder);
    } catch (error) {
      throw new Error(
        `Failed to update status for order with ID ${id}: ${error}`,
      );
    }
  }

  /**
   * Associates a payment with a specific order.
   * @param orderId - The ID of the order.
   * @param paymentId - The ID of the payment to associate.
   * @returns The updated order with the associated payment.
   * @throws Error if the association fails.
   */
  async addPayment(orderId: number, paymentId: string): Promise<Order> {
    try {
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          payments: {
            connect: {
              id: +paymentId,
            },
          },
        },
      });
      return fromOrderPrisma(updatedOrder);
    } catch (error) {
      throw new Error(
        `Failed to add payment to order with ID ${orderId}: ${error}`,
      );
    }
  }

  /**
   * Associates a refund with a specific order.
   * @param orderId - The ID of the order.
   * @param refundId - The ID of the refund to associate.
   * @returns The updated order with the associated refund.
   * @throws Error if the association fails.
   */
  async addRefund(orderId: number, refundId: string): Promise<Order> {
    try {
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          refunds: {
            connect: { id: +refundId },
          },
        },
      });
      return fromOrderPrisma(updatedOrder);
    } catch (error) {
      throw new Error(
        `Failed to add refund to order with ID ${orderId}: ${error}`,
      );
    }
  }

  /**
   * Retrieves an order by its tracking number.
   * @param trackingNumber - The tracking number of the order to retrieve.
   * @returns The found order or null if not found.
   * @throws Error if the retrieval fails.
   */
  async getByTrackingNumber(trackingNumber: string): Promise<Order | null> {
    try {
      const order = await prisma.order.findFirst({
        where: { trackingNumber },
      });
      return fromOrderPrisma(order);
    } catch (error) {
      throw new Error(
        `Failed to retrieve order with tracking number ${trackingNumber}: ${error}`,
      );
    }
  }

  /**
   * Retrieves orders within a specified date range.
   * @param startDate - The start date for the range.
   * @param endDate - The end date for the range.
   * @returns A list of orders placed within the specified date range.
   * @throws Error if the retrieval fails.
   */
  async getByDateRange(startDate: Date, endDate: Date): Promise<Order[]> {
    try {
      const orders = await prisma.order.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      return orders?.map(fromOrderPrisma);
    } catch (error) {
      throw new Error(
        `Failed to retrieve orders within the date range: ${error}`,
      );
    }
  }

  /**
   * Retrieves recent orders for a specific shop.
   * @param shopId - The ID of the shop.
   * @param limit - The maximum number of orders to retrieve.
   * @returns A list of recent orders for the specified shop.
   * @throws Error if the retrieval fails.
   */
  async getRecentOrdersByShop(shopId: number, limit: number): Promise<Order[]> {
    try {
      const orders = await prisma.order.findMany({
        where: { shopId },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
      return orders?.map(fromOrderPrisma);
    } catch (error) {
      throw new Error(
        `Failed to retrieve recent orders for shop with ID ${shopId}: ${error}`,
      );
    }
  }

  /**
   * Retrieves the top N orders based on the total amount.
   * @param topN - The number of top orders to retrieve.
   * @returns A list of top orders by amount.
   * @throws Error if the retrieval fails.
   */
  async getTopOrdersByAmount(topN: number): Promise<Order[]> {
    try {
      const orders = await prisma.order.findMany({
        orderBy: { totalAmount: 'desc' },
        take: topN,
      });
      return orders?.map(fromOrderPrisma);
    } catch (error) {
      throw new Error(
        `Failed to retrieve top ${topN} orders by amount: ${error}`,
      );
    }
  }
}
