
import { Field } from '@nestjs/graphql';
import { DiscountType } from 'src/domain/enums/discount-type.enum';
import { ProductOutput } from './product.output';

/**
 * Data Transfer Object for Promotion.
 * Used for validating and transforming promotion data in API requests and responses.
 */
export class PromotionOutput {
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
  @Field(() => Date, { nullable: true })
  endDate: Date;

  /**
   * Unique identifier for the product that the promotion applies to.
   */
  @Field()
  productId: number;

  /**
   * The product associated with the promotion.
   */
  @Field(() => ProductOutput, { nullable: true })
  product: ProductOutput;

  /**
   * Date and time when the promotion was created.
   */
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  /**
   * Date and time when the promotion was last updated.
   */
  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  /**
   * Creates a new PromotionOutput instance.
   * @param id - Unique identifier for the promotion.
   * @param name - Name of the promotion.
   * @param discountValue - Amount or percentage of the discount.
   * @param discountType - Type of the discount.
   * @param startDate - Start date of the promotion.
   * @param endDate - End date of the promotion.
   * @param productId - Unique identifier for the product.
   * @param product - The product associated with the promotion.
   * @param createdAt - (Optional) Date and time of promotion creation.
   * @param updatedAt - (Optional) Date and time of the last update.
   */
  constructor(
    id: number,
    name: string,
    discountValue: number,
    discountType: DiscountType,
    startDate: Date,
    endDate: Date,
    productId: number,
    product: ProductOutput,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id;
    this.name = name;
    this.discountValue = discountValue;
    this.discountType = discountType;
    this.startDate = startDate;
    this.endDate = endDate;
    this.productId = productId;
    this.product = product;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
