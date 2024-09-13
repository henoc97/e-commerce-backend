import { NotificationType } from "../enums/notification-type.enum";

/**
 * Repository interface for managing notifications.
 * Defines CRUD operations and additional business-specific functionalities for notifications.
 */
export interface INotificationRepository {
  
  /**
   * Creates a new notification.
   * @param notification - The notification entity to create.
   * @returns A promise that resolves to the created Notification.
   * @throws Error if creation fails.
   */
  create(notification: Notification): Promise<Notification>;

  /**
   * Retrieves a notification by its unique ID.
   * @param id - The unique ID of the notification.
   * @returns A promise that resolves to the Notification if found, otherwise null.
   * @throws Error if retrieval fails.
   */
  getById(id: number): Promise<Notification | null>;

  /**
   * Updates an existing notification.
   * @param id - The unique ID of the notification to update.
   * @param updates - Partial notification data to update.
   * @returns A promise that resolves to the updated Notification.
   * @throws Error if update fails.
   */
  update(id: number, updates: Partial<Notification>): Promise<Notification>;

  /**
   * Deletes a notification by its unique ID.
   * @param id - The unique ID of the notification to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   * @throws Error if deletion fails.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Retrieves all notifications for a specific user.
   * @param userId - The unique ID of the user.
   * @returns A promise that resolves to an array of Notifications for the specified user.
   * @throws Error if retrieval fails.
   */
  getByUserId(userId: number): Promise<Notification[]>;

  /**
   * Retrieves all notifications of a specific type.
   * @param type - The type of notifications to retrieve.
   * @returns A promise that resolves to an array of Notifications of the specified type.
   * @throws Error if retrieval fails.
   */
  getByType(type: NotificationType): Promise<Notification[]>;

  /**
   * Retrieves notifications within a specified date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns A promise that resolves to an array of Notifications sent within the date range.
   * @throws Error if retrieval fails.
   */
  getByDateRange(startDate: Date, endDate: Date): Promise<Notification[]>;

  /**
   * Marks a notification as read.
   * @param id - The unique ID of the notification to mark as read.
   * @returns A promise that resolves to the updated Notification.
   * @throws Error if the update fails.
   */
  markAsRead(id: number): Promise<Notification>;

  /**
   * Counts the total number of unread notifications for a specific user.
   * @param userId - The unique ID of the user.
   * @returns A promise that resolves to the count of unread notifications.
   * @throws Error if the count fails.
   */
  countUnread(userId: number): Promise<number>;

  /**
   * Retrieves recent notifications (e.g., last 24 hours) for a specific user.
   * @param userId - The unique ID of the user.
   * @returns A promise that resolves to an array of recent Notifications.
   * @throws Error if retrieval fails.
   */
  getRecent(userId: number): Promise<Notification[]>;
}
