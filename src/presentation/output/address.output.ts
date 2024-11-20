import { Field, ObjectType } from '@nestjs/graphql';
import { UserOutput } from './user.output';


@ObjectType()
export class AddressOutput {
  /**
   * Unique identifier for the address.
   */
  @Field({ nullable: true }) // Nullable car `id` est optionnel.
  id?: number;

  /**
   * Foreign key referring to the User who owns this address.
   */
  @Field()
  userId: number;

  /**
   * User associated with the address.
   */
  @Field(() => UserOutput, { nullable: true }) // Relation avec UserOutput.
  user?: UserOutput;

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

  /**
   * Constructs an AddressOutput instance.
   *
   * @param id - Unique identifier for the address.
   * @param userId - Foreign key referring to the User.
   * @param street - Street address.
   * @param city - City where the address is located.
   * @param state - State or region where the address is located.
   * @param postalCode - Postal code for the address.
   * @param country - Country where the address is located.
   * @param user - User to whom the address (optional).
   */
  constructor(
    id: number,
    userId: number,
    street: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    user?: UserOutput,
  ) {
    this.id = id;
    this.userId = userId;
    this.street = street;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
    this.user = user;
  }
}
