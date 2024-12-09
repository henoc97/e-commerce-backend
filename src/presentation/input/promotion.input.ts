import { DiscountType } from '../../domain/enums/discount-type.enum';
import { Field, InputType } from '@nestjs/graphql';

/**
 * Input Type for Promotion.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class PromotionInput {
  /**
   * Unique identifier for the promotion.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Name of the promotion (e.g., "Summer Sale", "Black Friday Discount").
   */
  @Field()
  name: string;

  /**
   * Amount or percentage of the discount applied.
   * The interpretation depends on the discountType (e.g., flat amount or percentage).
   */
  @Field()
  discountValue: number;

  /**
   * Type of discount applied (e.g., FLAT_AMOUNT, PERCENTAGE).
   */
  @Field()
  discountType: DiscountType;

  /**
   * The date when the promotion starts.
   */
  @Field()
  startDate: Date;

  /**
   * The date when the promotion ends.
   */
  @Field()
  endDate: Date;

  /**
   * Unique identifier for the product that the promotion applies to.
   */
  @Field()
  productId: number;
}
