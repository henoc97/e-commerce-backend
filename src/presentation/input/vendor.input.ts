import { Field, InputType } from "@nestjs/graphql";

/**
 * Input Type for Vendor.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class VendorInput {
  /**
   * Unique identifier for the vendor.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Identifier of the user associated with the vendor.
   */
  @Field()
  userId: number;

  /**
   * Name of the vendor's store.
   */
  @Field()
  storeName: string;

  /**
   * Optional ID of the subscription.
   */
  @Field({ nullable: true })
  subscriptionId?: number;
}
