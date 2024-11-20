import { Field, InputType } from "@nestjs/graphql";


/**
 * Input Type for Shop.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class ShopInput {
  /**
   * Unique identifier for the shop.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * The name of the shop.
   */
  @Field()
  name: string;

  /**
   * The URL of the shop's website.
   */
  @Field()
  url: string;

  /**
   * Optional description of the shop.
   */
  @Field()
  description?: string;

  /**
   * Unique identifier for the vendor associated with the shop.
   */
  @Field()
  vendorId: number;

  /**
   * Optional ID of the marketplace where the shop is listed.
   */
  @Field()
  marketplaceId?: number;
}
