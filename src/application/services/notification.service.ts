import { Inject, Injectable } from '@nestjs/common';
import { NotificationType } from 'src/domain/enums/notification-type.enum';
import { INotificationRepository } from 'src/domain/repositories/notification.repository';
import { NotificationDTO } from 'src/presentation/dtos/notification.dto';
import { Notification } from '../../domain/entities/notification.entity';
import { fromNotificationDTO } from '../helper/to-entity/to.notification.entity';

/**
 * Service for managing notifications.
 * Implements business logic for handling notifications using the INotificationRepository interface.
 */
@Injectable()
export class NotificationService {
  constructor(
    @Inject('INotificationRepository')
    private readonly notificationRepository: INotificationRepository,
  ) {}

  /**
   * Creates a new notification.
   * @param notificationDTO - Data Transfer Object containing notification details.
   * @returns A promise that resolves to the created Notification entity.
   */
  async createNotification(
    notificationDTO: NotificationDTO,
  ): Promise<Notification> {
    const notification = fromNotificationDTO(notificationDTO);
    return await this.notificationRepository.create(notification);
  }

  /**
   * Retrieves a notification by its unique ID.
   * @param id - The unique ID of the notification.
   * @returns A promise that resolves to the Notification entity if found, otherwise null.
   */
  async getNotificationById(id: number): Promise<Notification | null> {
    return await this.notificationRepository.getById(id);
  }

  /**
   * Updates an existing notification.
   * @param id - The unique ID of the notification to update.
   * @param updates - Partial notification data to update.
   * @returns A promise that resolves to the updated Notification entity.
   */
  async updateNotification(
    id: number,
    updates: Partial<NotificationDTO>,
  ): Promise<Notification> {
    const notification = fromNotificationDTO(updates);
    return await this.notificationRepository.update(id, notification);
  }

  /**
   * Deletes a notification by its unique ID.
   * @param id - The unique ID of the notification to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async deleteNotification(id: number): Promise<boolean> {
    return await this.notificationRepository.delete(id);
  }

  /**
   * Retrieves all notifications for a specific user.
   * @param userId - The unique ID of the user.
   * @returns A promise that resolves to an array of Notifications for the specified user.
   */
  async getNotificationsByUserId(userId: number): Promise<Notification[]> {
    return await this.notificationRepository.getByUserId(userId);
  }

  /**
   * Retrieves all notifications of a specific type.
   * @param type - The type of notifications to retrieve.
   * @returns A promise that resolves to an array of Notifications of the specified type.
   */
  async getNotificationsByType(
    type: NotificationType,
  ): Promise<Notification[]> {
    return await this.notificationRepository.getByType(type);
  }

  /**
   * Retrieves notifications within a specified date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to an array of Notifications sent within the date range.
   */
  async getNotificationsByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Notification[]> {
    return await this.notificationRepository.getByDateRange(startDate, endDate);
  }

  /**
   * Marks a notification as read.
   * @param id - The unique ID of the notification to mark as read.
   * @returns A promise that resolves to the updated Notification entity.
   */
  async markNotificationAsRead(id: number): Promise<Notification> {
    return await this.notificationRepository.markAsRead(id);
  }

  /**
   * Counts the total number of unread notifications for a specific user.
   * @param userId - The unique ID of the user.
   * @returns A promise that resolves to the count of unread notifications.
   */
  async countUnreadNotifications(userId: number): Promise<number> {
    return await this.notificationRepository.countUnread(userId);
  }

  /**
   * Retrieves recent notifications (e.g., last 24 hours) for a specific user.
   * @param userId - The unique ID of the user.
   * @returns A promise that resolves to an array of recent Notifications.
   */
  async getRecentNotifications(userId: number): Promise<Notification[]> {
    return await this.notificationRepository.getRecent(userId);
  }
}
