import { Field, InputType } from "@nestjs/graphql";


/**
 * Input Type for ProductVariant.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class ProductVariantInput {
  /**
   * Unique identifier for the ProductVariant.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * ID of the associated Product.
   */
  @Field()
  productId: number;

  /**
   * Name of the variant, such as 'Size' or 'Color'.
   */
  @Field()
  name: string;

  /**
   * Value of the variant, such as 'Large' or 'Red'.
   */
  @Field()
  value: string;
}
