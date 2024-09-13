import { User } from './user.entity';
import { UserActivityAction } from '../enums/user-activity-action.enum';

/**
 * Represents a record of user activity within the system.
 * Captures details about the user's actions, including the action type, associated user, optional product, and timestamp.
 */
export class UserActivity {
  /**
   * Unique identifier for the user activity record.
   * This ID is used to uniquely identify each user activity in the system.
   */
  id: number;

  /**
   * Unique identifier for the user who performed the activity.
   * This ID references the `User` entity associated with the activity.
   */
  userId: number;

  /**
   * The user who performed the activity.
   * Provides details about the user who initiated the action.
   */
  user: User;

  /**
   * Type of action performed by the user.
   * This could represent various actions such as login, view product, purchase, etc.
   */
  action: UserActivityAction;

  /**
   * Optional product ID related to the activity.
   * This property is only relevant if the action involves a specific product.
   */
  productId?: number;

  /**
   * The date and time when the activity was performed.
   * Automatically set to the current date and time when the activity is recorded.
   */
  timestamp: Date;

  /**
   * Constructs a new UserActivity instance.
   * @param id - Unique identifier for the user activity.
   * @param userId - Unique identifier of the user who performed the activity.
   * @param user - The user who performed the activity.
   * @param action - The type of action performed by the user.
   * @param productId - (Optional) The product associated with the activity, if applicable.
   * @param timestamp - (Optional) The date and time when the activity was performed, defaults to the current date and time.
   */
  constructor(
    id: number,
    userId: number,
    user: User,
    action: UserActivityAction,
    productId?: number,
    timestamp: Date = new Date()
  ) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.action = action;
    this.productId = productId;
    this.timestamp = timestamp;
  }
}
