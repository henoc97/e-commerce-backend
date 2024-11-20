import { Field, ObjectType } from "@nestjs/graphql";
import { ShopOutput } from "./shop.output";


/**
 * Data Transfer Object for Marketplace.
 * Used for validating and transforming data in API requests and responses.
 */
@ObjectType()
export class MarketplaceOutput {
  /**
   * Unique identifier for the Marketplace.
   * Optional during creation, required for updates.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Name of the Marketplace.
   * Must be a non-empty string.
   */
  @Field()
  name: string;

  /**
   * Description of the Marketplace.
   * Optional field providing additional information about the Marketplace.
   */
  @Field({ nullable: true })
  description?: string;

  /**
   * List of shops within the Marketplace.
   * Validates each shop using ShopOutput.
   * Optional.
   */
  @Field(() => [ShopOutput], { nullable: true })
  shops?: ShopOutput[];

  /**
   * Creates a new MarketplaceOutput instance.
   * @param name - Name of the Marketplace.
   * @param description - (Optional) Description of the Marketplace.
   * @param shops - (Optional) List of shops within the Marketplace.
   * @param id - Unique identifier for the Marketplace (optional).
   */
  constructor(
    name: string,
    description?: string,
    shops?: ShopOutput[],
    id?: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.shops = shops;
  }
}
