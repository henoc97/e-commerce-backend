import { Field, InputType } from "@nestjs/graphql";

/**
 * Input Type for ProductImage.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class ProductImageInput {
  /**
   * Unique identifier for the product image.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Foreign key linking this image to a Product.
   */
  @Field()
  productId: number;

  /**
   * URL where the image is located.
   */
  @Field()
  url: string;
}
