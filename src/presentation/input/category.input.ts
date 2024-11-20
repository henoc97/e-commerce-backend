import { Field, InputType } from "@nestjs/graphql";

/**
 * Input Type for  Category.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class CategoryDTO {
  /**
   * Unique identifier for the Category.
   * Optional during creation, required for updates.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Name of the Category.
   * Must be a non-empty string.
   */
  @Field()
  name: string;

  /**
   * ID of the parent Category.
   * Optional, will be used if parent is not provided.
   */
  @Field({ nullable: true })
  parentId?: number;

  /**
   * ID of the Shop this category belongs to.
   * Optional, will be used if shop is not provided.
   */
  @Field({ nullable: true })
  shopId?: number;
}
