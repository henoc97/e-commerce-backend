import { Field, ObjectType } from "@nestjs/graphql";
import { NotificationType } from "src/domain/enums/notification-type.enum";
import { UserOutput } from "./user.output";
import { Type } from "class-transformer";


/**
 * Data Transfer Object for Notification.
 * Used for validating and transforming data in API requests and responses.
 */
@ObjectType()
export class NotificationOutput {
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
   * User associated with the address.
   */
  @Field(() => UserOutput, { nullable: true })
  @Type(() => UserOutput)
  user?: UserOutput;

  /**
   * The type of the notification (e.g., INFO, WARNING, ERROR).
   * Must be a valid NotificationType.
   */
  @Field(() => NotificationType, { nullable: true })
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

  /**
   * The date and time when the notification was sent.
   * Must be in ISO date format.
   * Optional during creation, will be set automatically if not provided.
   */
  @Field(() => Date, { nullable: true })
  sentAt?: Date;

  /**
   * Creates a new NotificationOutput instance.
   * @param userId - Unique identifier for the user receiving the notification.
   * @param type - The type of the notification.
   * @param content - The content of the notification.
   * @param sentAt - (Optional) Date and time of notification creation.
   * @param id - Unique identifier for the notification (optional).
   * @param user - User to whom the address (optional)
   */
  constructor(
    userId?: number,
    type?: NotificationType,
    content?: string,
    read: boolean = false,
    sentAt?: Date,
    id?: number,
    user?: UserOutput,
  ) {
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.content = content;
    this.read = read;
    this.sentAt = sentAt;
    this.user = user;
  }
}
