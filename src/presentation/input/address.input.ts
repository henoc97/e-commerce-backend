import { Field, InputType } from '@nestjs/graphql';

/**
 * Input Type for Address.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class AddressInput {
  /**
   * Unique identifier for the address (optional for creation).
   */
  @Field({ nullable: true }) // Explicitement nullable pour GraphQL.
  id?: number;

  /**
   * Foreign key referring to the User who owns this address.
   */
  @Field(() => Number)
  userId: number;

  /**
   * Street address.
   */
  @Field()
  street: string;

  /**
   * City where the address is located.
   */
  @Field()
  city: string;

  /**
   * State or region where the address is located.
   */
  @Field()
  state: string;

  /**
   * Postal code for the address.
   */
  @Field()
  postalCode: string;

  /**
   * Country where the address is located.
   */
  @Field()
  country: string;
}
