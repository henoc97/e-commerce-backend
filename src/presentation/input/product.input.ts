import { Field, InputType } from "@nestjs/graphql";
import { Currency } from "../../domain/enums/currencies.enum";


/**
 * Input Type for Product.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class ProductInput {
  /**
   * Unique identifier for the Product.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * The name of the Product.
   */
  @Field()
  name: string;

  /**
   * An optional description of the Product.
   */
  @Field({ nullable: true })
  description?: string;

  /**
   * The price of the Product.
   */
  @Field()
  price: number;

  @Field()
  currency: Currency;

  /**
   * The ID of the category to which the Product belongs.
   */
  @Field()
  categoryId: number;

  /**
   * The stock quantity of the Product.
   */
  @Field()
  stock: number;

  /**
   * Optional ID of the Vendor associated with the Product.
   */
  @Field()
  vendorId?: number;

  /**
   * The ID of the Shop where the Product is listed.
   */
  @Field()
  shopId: number;
}
