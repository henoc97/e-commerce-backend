import { User } from './user.entity';

/**
 * Represents an Address associated with a User.
 */
export class Address {
  /**
   * Unique identifier for the address.
   */
  id: number;

  /**
   * Foreign key referring to the User who owns this address.
   */
  userId: number;

  /**
   * The User object associated with this address.
   */
  user: User;

  /**
   * Street address.
   */
  street: string;

  /**
   * City where the address is located.
   */
  city: string;

  /**
   * State or region where the address is located.
   */
  state: string;

  /**
   * Postal code for the address.
   */
  postalCode: string;

  /**
   * Country where the address is located.
   */
  country: string;

  /**
   * Constructs an Address instance.
   * 
   * @param id - Unique identifier for the address.
   * @param userId - Foreign key referring to the User.
   * @param user - The User object associated with this address.
   * @param street - Street address.
   * @param city - City where the address is located.
   * @param state - State or region where the address is located.
   * @param postalCode - Postal code for the address.
   * @param country - Country where the address is located.
   */
  constructor(
    id: number,
    userId: number,
    user: User,
    street: string,
    city: string,
    state: string,
    postalCode: string,
    country: string
  ) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.street = street;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
  }
}
