import { Field, InputType } from "@nestjs/graphql";
import { NotificationType } from "src/domain/enums/notification-type.enum";


/**
 * Input Type for Notification.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class NotificationInput {
  /**
   * Unique identifier for the notification.
   * Optional during creation, required for updates.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Unique identifier for the user receiving the notification.
   * Must be an integer.
   */
  @Field()
  userId: number;

  /**
   * The type of the notification (e.g., INFO, WARNING, ERROR).
   * Must be a valid NotificationType.
   */
  @Field()
  type: NotificationType;

  /**
   * The content of the notification.
   * Must be a non-empty string.
   */
  @Field()
  content: string;

  /**
   * The content of the notification is read or not.
   */
  @Field()
  read: boolean;
}
