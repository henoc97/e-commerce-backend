import { Order } from '../../domain/entities/order.entity';
import { OrderStatus } from '../../domain/enums/order-status.enum';
import { IOrderRepository } from '../../domain/repositories/order.repository';
import { OrderDTO } from '../../presentation/dtos/order.dto';
import { fromOrderDTO } from '../helper/to-entity/to.order.entity';
import { Inject } from '@nestjs/common';
import { KafkaProducerService } from '../../infrastructure/external-services/kafka/services/kafka-producer.service';

/**
 * Service class for managing Order entities.
 * Implements business logic for CRUD operations and other use cases related to Orders.
 */
export class OrderService {
  constructor(
    @Inject('IOrderRepository') private readonly orderRepository: IOrderRepository,
    private readonly kafkaProducerService: KafkaProducerService,

  ) { }

  /**
   * Creates a new Order.
   * @param orderDTO - Data Transfer Object containing the Order data.
   * @returns A promise that resolves to the created Order entity.
   */
  async createOrder(orderDTO: OrderDTO): Promise<Order> {
    const order = fromOrderDTO(orderDTO);
    const result = await this.orderRepository.create(order);
    if (result) this.kafkaProducerService.emitEvent('order.created', JSON.stringify(result));
    return result;
  }

  /**
   * Retrieves an Order by its ID.
   * @param id - The unique ID of the Order.
   * @returns A promise that resolves to the Order entity if found, otherwise null.
   */
  async getOrderById(id: number): Promise<Order | null> {
    return await this.orderRepository.getById(id);
  }

  /**
   * Updates an existing Order.
   * @param id - The unique ID of the Order.
   * @param updates - Partial data to update the Order.
   * @returns A promise that resolves to the updated Order entity.
   */
  async updateOrder(id: number, updates: Partial<OrderDTO>): Promise<Order> {
    const updatedOrder = fromOrderDTO(updates);
    const result = await this.orderRepository.update(id, updatedOrder);
    if (result) this.kafkaProducerService.emitEvent('order.updated', JSON.stringify(result));
    return result;
  }

  /**
   * Deletes an Order by its ID.
   * @param id - The unique ID of the Order.
   * @returns A promise that resolves to true if the deletion was successful, otherwise false.
   */
  async deleteOrder(id: number): Promise<boolean> {
    return await this.orderRepository.delete(id);
  }

  /**
   * Retrieves all Orders for a specific User.
   * @param userId - The unique ID of the User.
   * @returns A promise that resolves to an array of Orders for the User.
   */
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return await this.orderRepository.getByUserId(userId);
  }

  /**
   * Retrieves all Orders for a specific Shop.
   * @param shopId - The unique ID of the Shop.
   * @returns A promise that resolves to an array of Orders for the Shop.
   */
  async getOrdersByShopId(shopId: number): Promise<Order[]> {
    return await this.orderRepository.getByShopId(shopId);
  }

  /**
   * Retrieves all Orders with a specific status.
   * @param status - The status of Orders to find.
   * @returns A promise that resolves to an array of Orders with the specified status.
   */
  async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
    return await this.orderRepository.getByStatus(status);
  }

  /**
   * Updates the status of an Order.
   * @param id - The unique ID of the Order.
   * @param status - The new status to set.
   * @returns A promise that resolves to the updated Order entity.
   */
  async updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
    const result = this.orderRepository.updateStatus(id, status);
    if (result) this.kafkaProducerService.emitEvent('order.updates', JSON.stringify(result));
    return result;
  }

  /**
   * Adds a payment to an Order.
   * @param orderId - The unique ID of the Order.
   * @param paymentId - The unique ID of the Payment to add.
   * @returns A promise that resolves to the updated Order entity.
   */
  async addPaymentToOrder(orderId: number, paymentId: string): Promise<Order> {
    return await this.orderRepository.addPayment(orderId, paymentId);
  }

  /**
   * Adds a refund to an Order.
   * @param orderId - The unique ID of the Order.
   * @param refundId - The unique ID of the Refund to add.
   * @returns A promise that resolves to the updated Order entity.
   */
  async addRefundToOrder(orderId: number, refundId: string): Promise<Order> {
    return await this.orderRepository.addRefund(orderId, refundId);
  }

  /**
   * Retrieves an Order by its tracking number.
   * @param trackingNumber - The tracking number of the Order.
   * @returns A promise that resolves to the Order entity if found, otherwise null.
   */
  async getOrderByTrackingNumber(
    trackingNumber: string,
  ): Promise<Order | null> {
    return await this.orderRepository.getByTrackingNumber(trackingNumber);
  }

  /**
   * Retrieves all Orders created within a specific date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to an array of Orders created within the date range.
   */
  async getOrdersByDateRange(startDate: Date, endDate: Date): Promise<Order[]> {
    return await this.orderRepository.getByDateRange(startDate, endDate);
  }

  /**
   * Retrieves the most recent Orders for a specific Shop.
   * @param shopId - The unique ID of the Shop.
   * @param limit - The number of most recent Orders to retrieve.
   * @returns A promise that resolves to an array of the most recent Orders.
   */
  async getRecentOrdersByShop(shopId: number, limit: number): Promise<Order[]> {
    return await this.orderRepository.getRecentOrdersByShop(shopId, limit);
  }

  /**
   * Retrieves the top N Orders with the highest total amounts.
   * @param topN - The number of top Orders to retrieve.
   * @returns A promise that resolves to an array of the top N Orders by total amount.
   */
  async getTopOrdersByAmount(topN: number): Promise<Order[]> {
    return await this.orderRepository.getTopOrdersByAmount(topN);
  }

  /**
   * Retrieves all Orders.
   * @returns A promise that resolves to an array of all Orders.
   */
  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.getAll();
  }
}
