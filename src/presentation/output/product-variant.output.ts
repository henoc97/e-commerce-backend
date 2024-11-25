import { Field, ObjectType } from "@nestjs/graphql";
import { ProductOutput } from "./product.output";
import { Type } from "class-transformer";


/**
 * Data Transfer Object for ProductVariant.
 * Used for validation and transformation of product variant data in API requests and responses.
 */
@ObjectType()
export class ProductVariantOutput {
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
   * The Product this variant belongs to.
   * This is a nested object validated separately.
   */
  @Field(() => ProductOutput, { nullable: true })
  @Type(() => ProductOutput)
  product: ProductOutput;

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

  /**
   * Creates a new ProductVariantOutput instance.
   * @param id - Unique identifier for the ProductVariant.
   * @param productId - ID of the associated Product.
   * @param product - The Product this variant belongs to.
   * @param name - Name of the variant.
   * @param value - Value of the variant.
   */
  constructor(
    id?: number,
    productId?: number,
    product?: ProductOutput,
    name?: string,
    value?: string,
  ) {
    this.id = id;
    this.productId = productId;
    this.product = product;
    this.name = name;
    this.value = value;
  }
}
