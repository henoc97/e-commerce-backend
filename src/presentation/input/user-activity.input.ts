import { Field, InputType } from "@nestjs/graphql";
import { UserActivityAction } from "src/domain/enums/user-activity-action.enum";

/**
 * Input Type for UserActivity.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class UserActivityInput {
  /**
   * Unique identifier for the user activity record.
   */
  @Field({ nullable: true })
  id: number;

  /**
   * Unique identifier for the user who performed the activity.
   */
  @Field()
  userId: number;

  /**
   * Type of action performed by the user (e.g., LOGIN, VIEW_PRODUCT).
   */
  @Field()
  action: UserActivityAction;

  /**
   * Optional product ID related to the activity.
   * Relevant if the action involves a specific product.
   */
  @Field()
  productId?: number;
}
