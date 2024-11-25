import { Field, InputType } from "@nestjs/graphql";

/**
 * Input Type for Marketplace.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class MarketplaceInput {
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
}
