import { Field, ObjectType } from "@nestjs/graphql";
import { ProductOutput } from "./product.output";
import { ShopOutput } from "./shop.output";
import { Type } from "class-transformer"
/**
 * Data Transfer Object for Category.
 * Used for validating and transforming data in API requests and responses.
 */
@ObjectType()
export class CategoryOutput {
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
   * The parent category of this category.
   * Validates the parent category using CategoryOutput if provided.
   * Optional.
   */
  @Field(() => CategoryOutput, { nullable: true })
  @Type(() => CategoryOutput)
  parent?: CategoryOutput;

  /**
   * ID of the parent Category.
   * Optional, will be used if parent is not provided.
   */
  @Field({ nullable: true })
  parentId?: number;

  /**
   * Child categories of this category.
   * Validates each child category using CategoryOutput.
   * Optional.
   */
  @Field(() => [CategoryOutput], { nullable: true })
  @Type(() => CategoryOutput)
  children?: CategoryOutput[];

  /**
   * Products associated with this Category.
   * Validates each product using ProductOutput.
   * Optional.
   */
  @Field(() => [ProductOutput], { nullable: true })
  @Type(() => ProductOutput)
  products?: ProductOutput[];

  /**
   * The Shop this category belongs to.
   * Validates the shop using ShopOutput if provided.
   * Optional.
   */
  @Field(() => ShopOutput, { nullable: true })
  @Type(() => ShopOutput)
  shop?: ShopOutput;

  /**
   * ID of the Shop this category belongs to.
   * Optional, will be used if shop is not provided.
   */
  @Field({ nullable: true })
  shopId?: number;

  /**
   * Creates a new CategoryOutput instance.
   * @param id - Unique identifier for the Category.
   * @param name - Name of the Category.
   * @param parent - The parent category of this category (optional).
   * @param parentId - ID of the parent Category (optional).
   * @param children - Child categories of this category (optional).
   * @param products - Products associated with this Category (optional).
   * @param Shop - The Shop this category belongs to (optional).
   * @param shopId - ID of the Shop this category belongs to (optional).
   */
  constructor(
    name?: string,
    id?: number,
    parentId?: number,
    parent?: CategoryOutput,
    children?: CategoryOutput[],
    products?: ProductOutput[],
    shopId?: number,
    shop?: ShopOutput,
  ) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.parentId = parentId;
    this.children = children;
    this.products = products;
    this.shop = shop;
    this.shopId = shopId;
  }
}
