import { IsInt, IsEnum, IsOptional, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDTO } from './user.dto';
import { UserActivityAction } from 'src/domain/enums/user-activity-action.enum';

/**
 * Data Transfer Object for UserActivity.
 * Used for validating and transforming user activity data in API requests and responses.
 */
export class UserActivityDTO {
  /**
   * Unique identifier for the user activity record.
   */
  @IsInt()
  id: number;

  /**
   * Unique identifier for the user who performed the activity.
   */
  @IsInt()
  userId: number;

  /**
   * The user who performed the activity.
   * Provides details about the user who initiated the action.
   */
  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO;

  /**
   * Type of action performed by the user (e.g., LOGIN, VIEW_PRODUCT).
   */
  @IsEnum(UserActivityAction)
  action: UserActivityAction;

  /**
   * Optional product ID related to the activity.
   * Relevant if the action involves a specific product.
   */
  @IsOptional()
  @IsInt()
  productId?: number;

  /**
   * The date and time when the activity was performed.
   */
  @IsDateString()
  timestamp: Date;

  /**
   * Creates a new UserActivityDTO instance.
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
    user: UserDTO,
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
