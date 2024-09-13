import { IsInt, IsString, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { NotificationType } from 'src/domain/enums/notification-type.enum';

/**
 * Data Transfer Object for Notification.
 * Used for validating and transforming data in API requests and responses.
 */
export class NotificationDTO {
  /**
   * Unique identifier for the notification.
   * Optional during creation, required for updates.
   */
  @IsInt()
  @IsOptional()
  id?: number;

  /**
   * Unique identifier for the user receiving the notification.
   * Must be an integer.
   */
  @IsInt()
  userId: number;

  /**
   * The type of the notification (e.g., INFO, WARNING, ERROR).
   * Must be a valid NotificationType.
   */
  @IsEnum(NotificationType)
  type: NotificationType;

  /**
   * The content of the notification.
   * Must be a non-empty string.
   */
  @IsString()
  content: string;

  /**
   * The date and time when the notification was sent.
   * Must be in ISO date format.
   * Optional during creation, will be set automatically if not provided.
   */
  @IsDateString()
  @IsOptional()
  sentAt?: Date;

  /**
   * Creates a new NotificationDTO instance.
   * @param userId - Unique identifier for the user receiving the notification.
   * @param type - The type of the notification.
   * @param content - The content of the notification.
   * @param sentAt - (Optional) Date and time of notification creation.
   * @param id - Unique identifier for the notification (optional).
   */
  constructor(
    userId: number,
    type: NotificationType,
    content: string,
    sentAt?: Date,
    id?: number
  ) {
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.content = content;
    this.sentAt = sentAt;
  }
}
