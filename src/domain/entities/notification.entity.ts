import { NotificationType } from "../enums/notification-type.enum";
import { User } from "./user.entity";

/**
 * Represents a notification for a user.
 * Stores details about the notification type, content, and when it was sent.
 */
export class Notification {
  /**
   * Unique identifier for the notification.
   */
  id: number;

  /**
   * Unique identifier for the user who will receive the notification.
   */
  userId: number;

  /**
   * The user associated with the notification.
   */
  user: User;

  /**
   * The type of the notification (e.g., INFO, WARNING, ERROR).
   */
  type: NotificationType;

  /**
   * The content of the notification.
   */
  content: string;

  /**
   * The date and time when the notification was sent.
   * Automatically set to the current date and time when the notification is created.
   */
  sentAt: Date;

  /**
   * Creates a new Notification instance.
   * @param id - Unique identifier for the notification.
   * @param userId - Unique identifier for the user receiving the notification.
   * @param user - The user associated with the notification.
   * @param type - The type of the notification.
   * @param content - The content of the notification.
   * @param sentAt - (Optional) Date and time of notification creation.
   */
  constructor(
    id: number,
    userId: number,
    user: User,
    type: NotificationType,
    content: string,
    sentAt: Date = new Date()
  ) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.type = type;
    this.content = content;
    this.sentAt = sentAt;
  }
}
