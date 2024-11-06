import { OrderItem } from 'src/domain/entities/order-item.enttity';
import { IOrderItemRepository } from 'src/domain/repositories/order-item.repository';
import { OrderItemDTO } from 'src/presentation/dtos/order-item.dto';
import { fromOrderItemDTO } from '../helper/to-entity/to.order-item.entity';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

/**
 * Service class for managing OrderItems.
 * Implements business logic and interacts with the OrderItem repository.
 */
export class OrderItemService {
  /**
   * Creates a new instance of OrderItemService.
   * @param repository - The repository to interact with the OrderItem data.
   */
  constructor(
    @Inject('IOrderItemRepository')
    @Inject('KAFKA_SERVICE') 
    private readonly kafkaService: ClientKafka,
    private readonly repository: IOrderItemRepository,
  ) {}

  /**
   * Creates a new OrderItem and emit the OrderItem through kafka.
   * @param dto - The OrderItemDTO containing data for the new OrderItem.
   * @returns A promise that resolves to the created OrderItem entity.
   */
  async create(dto: OrderItemDTO): Promise<OrderItem> {
    const orderItem = fromOrderItemDTO(dto);
    // Create a new OrderItem
    const result = await this.repository.create(orderItem);
    // Emit the OrderItem through kafka
    if (result) this.kafkaService.emit('order-item.created', JSON.stringify(result));
    return result;
  }

  /**
   * Retrieves an OrderItem by its unique ID.
   * @param id - The unique ID of the OrderItem to retrieve.
   * @returns A promise that resolves to the OrderItem entity if found, otherwise null.
   */
  async getById(id: number): Promise<OrderItem | null> {
    return await this.repository.getById(id);
  }

  /**
   * Updates an existing OrderItem and emit the OrderItem through kafka.
   * @param id - The unique ID of the OrderItem to update.
   * @param updates - Partial data to update the OrderItem.
   * @returns A promise that resolves to the updated OrderItem entity.
   */
  async update(id: number, updates: Partial<OrderItemDTO>): Promise<OrderItem> {
    const updateData = fromOrderItemDTO(updates);
    const result = await this.repository.update(id, updateData);
    if (result) this.kafkaService.emit('order-item.updated', JSON.stringify(result));
    return result;
  }

  /**
   * Deletes an OrderItem by its unique ID.
   * @param id - The unique ID of the OrderItem to delete.
   * @returns A promise that resolves to true if the deletion was successful, otherwise false.
   */
  async delete(id: number): Promise<boolean> {
    return await this.repository.delete(id);
  }

  /**
   * Retrieves all OrderItems for a specific Order.
   * @param orderId - The unique ID of the Order.
   * @returns A promise that resolves to an array of OrderItem entities for the Order.
   */
  async getByOrderId(orderId: number): Promise<OrderItem[]> {
    return await this.repository.getByOrderId(orderId);
  }

  /**
   * Retrieves all OrderItems for a specific Product.
   * @param productId - The unique ID of the Product.
   * @returns A promise that resolves to an array of OrderItem entities for the Product.
   */
  async getByProductId(productId: number): Promise<OrderItem[]> {
    return await this.repository.getByProductId(productId);
  }

  /**
   * Calculates the total price of OrderItems for a specific Order.
   * @param orderId - The unique ID of the Order.
   * @returns A promise that resolves to the total price of the OrderItems.
   */
  async calculateTotalPrice(orderId: number): Promise<number> {
    return await this.repository.calculateTotalPrice(orderId);
  }

  /**
   * Retrieves the most recent OrderItems for a specific Order (e.g., from the last week).
   * @param orderId - The unique ID of the Order.
   * @returns A promise that resolves to an array of recent OrderItem entities.
   */
  async getRecentItems(orderId: number): Promise<OrderItem[]> {
    return await this.repository.getRecentItems(orderId);
  }

  /**
   * Retrieves all OrderItems that have a quantity below a specified threshold.
   * @param threshold - The quantity threshold.
   * @returns A promise that resolves to an array of OrderItem entities below the threshold.
   */
  async getLowStockItems(threshold: number): Promise<OrderItem[]> {
    return await this.repository.getLowStockItems(threshold);
  }
}
