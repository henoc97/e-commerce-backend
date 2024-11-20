import { Field, ObjectType } from '@nestjs/graphql';
import { UserActivityAction } from 'src/domain/enums/user-activity-action.enum';
import { UserOutput } from './user.output';

/**
 * Data Transfer Object for UserActivity.
 * Used for validating and transforming user activity data in API requests and responses.
 */
@ObjectType()
export class UserActivityOutput {
  /**
   * Unique identifier for the user activity record.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Unique identifier for the user who performed the activity.
   */
  @Field()
  userId: number;

  /**
   * The user who performed the activity.
   * Provides details about the user who initiated the action.
   */
  @Field(() => UserOutput, { nullable: true })
  user: UserOutput;

  /**
   * Type of action performed by the user (e.g., LOGIN, VIEW_PRODUCT).
   */
  @Field()
  action: UserActivityAction;

  /**
   * Optional product ID related to the activity.
   * Relevant if the action involves a specific product.
   */
  @Field({ nullable: true })
  productId?: number;

  /**
   * The date and time when the activity was performed.
   */
  @Field(() => Date, { nullable: true })
  timestamp: Date;

  /**
   * Creates a new UserActivityOutput instance.
   * @param id - Unique identifier for the user activity.
   * @param userId - Unique identifier for the user who performed the activity.
   * @param user - The user who performed the activity.
   * @param action - The type of action performed by the user.
   * @param productId - (Optional) The product associated with the activity, if applicable.
   * @param timestamp - (Optional) The date and time when the activity was performed, defaults to the current date and time.
   */
  constructor(
    id: number,
    userId: number,
    user: UserOutput,
    action: UserActivityAction,
    productId?: number,
    timestamp: Date = new Date(),
  ) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.action = action;
    this.productId = productId;
    this.timestamp = timestamp;
  }
}
