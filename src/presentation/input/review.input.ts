import { Field, InputType } from "@nestjs/graphql";


/**
 * Input Type for Review.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class ReviewInput {
  /**
   * Unique identifier for the review.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Unique identifier for the product associated with this review.
   */
  @Field()
  productId: number;

  /**
   * Unique identifier for the user who wrote the review.
   */
  @Field()
  userId: number;

  /**
   * Rating given in the review, usually on a scale from 1 to 5.
   */
  @Field()
  rating: number;

  /**
   * Optional comment provided by the user.
   */
  @Field({ nullable: true })
  comment?: string;

  /**
   * Indicates whether the review has been flagged for inspection.
   */
  @Field()
  flagged: boolean;

  /**
   * Indicates whether the review has been verified.
   */
  @Field()
  verified: boolean;
}
