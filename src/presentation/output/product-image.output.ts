import { Field, ObjectType } from "@nestjs/graphql";
import { ProductOutput } from "./product.output";
import { Type } from "class-transformer"

/**
 * Data Transfer Object for ProductImage.
 * Used for validation and transformation of product image data in API requests and responses.
 */
@ObjectType()
export class ProductImageOutput {
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
   * The Product entity associated with this image.
   * This is a nested object validated separately.
   */
  @Field(() => ProductOutput, { nullable: true })
  @Type(() => ProductOutput)
  product: ProductOutput;

  /**
   * URL where the image is located.
   */
  @Field()
  url: string;

  /**
   * Creates a new ProductImageOutput instance.
   * @param id - The unique identifier for the product image.
   * @param productId - The ID of the product to which the image belongs.
   * @param product - The Product entity associated with the image.
   * @param url - The URL of the product image.
   */
  constructor(id?: number, productId?: number, product?: ProductOutput, url?: string) {
    this.id = id;
    this.productId = productId;
    this.product = product;
    this.url = url;
  }
}
