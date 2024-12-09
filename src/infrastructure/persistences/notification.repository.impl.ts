import { fromNotificationPrisma } from '../../application/helper/from-prisma/to.notification.entity';
import { Notification } from '../../domain/entities/notification.entity';
import { NotificationType } from '../../domain/enums/notification-type.enum';
import { INotificationRepository } from '../../domain/repositories/notification.repository';
import prisma from '../../../prisma/prisma.service';

export class NotificationRepository implements INotificationRepository {

  /**
   * Creates a new notification in the database.
   * @param notification - The notification entity to create.
   * @returns A promise resolving to the created notification.
   */
  async create(notification: Notification): Promise<Notification> {
    try {
      const { id, user, ...data } = notification;
      const result = await prisma.notification.create({
        data: data,
      });
      return fromNotificationPrisma(result);
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  /**
   * Retrieves a notification by its ID.
   * @param id - The ID of the notification to retrieve.
   * @returns A promise resolving to the notification or null if not found.
   */
  async getById(id: number): Promise<Notification | null> {
    try {
      const result = await prisma.notification.findUnique({
        where: { id },
      });
      return fromNotificationPrisma(result);
    } catch (error) {
      console.error('Error retrieving notification by ID:', error);
      throw error;
    }
  }

  /**
   * Updates a notification with the given data.
   * @param id - The ID of the notification to update.
   * @param updates - The partial data to update in the notification.
   * @returns A promise resolving to the updated notification.
   */
  async update(
    id: number,
    updates: Partial<Notification>,
  ): Promise<Notification> {
    try {
      const { user, ...data } = updates;
      const result = await prisma.notification.update({
        where: { id },
        data: data,
      });
      return fromNotificationPrisma(result);
    } catch (error) {
      console.error('Error updating notification:', error);
      throw error;
    }
  }

  /**
   * Deletes a notification by its ID.
   * @param id - The ID of the notification to delete.
   * @returns A promise resolving to true if the deletion was successful, otherwise false.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.notification.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error('Error deleting notification:', error);
      return false;
    }
  }

  /**
   * Retrieves all notifications for a specific user by their userId.
   * @param userId - The ID of the user to retrieve notifications for.
   * @returns A promise resolving to an array of notifications.
   */
  async getByUserId(userId: number): Promise<Notification[]> {
    try {
      const result = await prisma.notification.findMany({
        where: { userId },
      });
      return result?.map(fromNotificationPrisma);
    } catch (error) {
      console.error('Error retrieving notifications for user:', error);
      throw error;
    }
  }

  /**
   * Retrieves notifications of a specific type.
   * @param type - The type of notifications to retrieve.
   * @returns A promise resolving to an array of notifications.
   */
  async getByType(type: NotificationType): Promise<Notification[]> {
    try {
      const result = await prisma.notification.findMany({
        where: { type },
      });
      return result?.map(fromNotificationPrisma);
    } catch (error) {
      console.error('Error retrieving notifications by type:', error);
      throw error;
    }
  }

  /**
   * Retrieves notifications within a specific date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise resolving to an array of notifications.
   */
  async getByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Notification[]> {
    try {
      const result = await prisma.notification.findMany({
        where: {
          sentAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      return result?.map(fromNotificationPrisma);
    } catch (error) {
      console.error('Error retrieving notifications by date range:', error);
      throw error;
    }
  }

  /**
   * Marks a notification as read by its ID.
   * @param id - The ID of the notification to mark as read.
   * @returns A promise resolving to the updated notification.
   */
  async markAsRead(id: number): Promise<Notification> {
    try {
      const result = await prisma.notification.update({
        where: { id },
        data: { read: true },
      });
      return fromNotificationPrisma(result);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  /**
   * Counts the number of unread notifications for a specific user.
   * @param userId - The ID of the user to count unread notifications for.
   * @returns A promise resolving to the count of unread notifications.
   */
  async countUnread(userId: number): Promise<number> {
    try {
      const result = await prisma.notification.count({
        where: {
          userId,
          read: false,
        },
      });
      return result;
    } catch (error) {
      console.error('Error counting unread notifications:', error);
      throw error;
    }
  }

  /**
   * Retrieves the most recent notifications for a user.
   * @param userId - The ID of the user to retrieve recent notifications for.
   * @returns A promise resolving to an array of the most recent notifications.
   */
  async getRecent(userId: number): Promise<Notification[]> {
    try {
      const result = await prisma.notification.findMany({
        where: { userId },
        orderBy: { sentAt: 'desc' },
        take: 10,
      });
      return result?.map(fromNotificationPrisma);
    } catch (error) {
      console.error('Error retrieving recent notifications:', error);
      throw error;
    }
  }
}
