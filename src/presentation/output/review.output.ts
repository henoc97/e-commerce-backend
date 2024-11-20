import { Field, ObjectType } from "@nestjs/graphql";
import { ProductOutput } from "./product.output";
import { UserOutput } from "./user.output";

/**
 * Data Transfer Object for Review.
 * Used for validating and transforming review data in API requests and responses.
 */
@ObjectType()
export class ReviewOutput {
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
   * The product associated with this review.
   */
  @Field(() => ProductOutput, { nullable: true })
  product: ProductOutput;

  /**
   * Unique identifier for the user who wrote the review.
   */
  @Field()
  userId: number;

  /**
   * The user who wrote the review.
   */
  @Field(() => UserOutput, { nullable: true })
  user: UserOutput;

  /**
   * Rating given in the review, usually on a scale from 1 to 5.
   */
  @Field()
  rating: number;

  /**
   * Optional comment provided by the user.
   */
  @Field()
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

  /**
   * The date and time when the review was created.
   */
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  /**
   * Creates a new ReviewOutput instance.
   * @param id - Unique identifier for the review.
   * @param productId - Unique identifier for the associated product.
   * @param product - The product related to this review.
   * @param userId - Unique identifier for the user.
   * @param user - The user who wrote the review.
   * @param rating - Rating given in the review.
   * @param comment - (Optional) Comment provided by the user.
   * @param createdAt - (Optional) Date and time of review creation.
   */
  constructor(
    id: number,
    productId: number,
    product: ProductOutput,
    userId: number,
    user: UserOutput,
    rating: number,
    comment?: string,
    createdAt: Date = new Date(),
  ) {
    this.id = id;
    this.productId = productId;
    this.product = product;
    this.userId = userId;
    this.user = user;
    this.rating = rating;
    this.comment = comment;
    this.createdAt = createdAt;
  }
}
