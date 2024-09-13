import { IsInt, IsNotEmpty, IsString, IsPostalCode, IsOptional } from 'class-validator';

/**
 * Data Transfer Object for Address.
 * Used for data validation and transformation in API requests and responses.
 */
export class AddressDTO {
  /**
   * Unique identifier for the address.
   */
  @IsInt()
  @IsOptional()
  id?: number;

  /**
   * Foreign key referring to the User who owns this address.
   */
  @IsInt()
  @IsNotEmpty()
  userId: number;

  /**
   * Street address.
   */
  @IsString()
  @IsNotEmpty()
  street: string;

  /**
   * City where the address is located.
   */
  @IsString()
  @IsNotEmpty()
  city: string;

  /**
   * State or region where the address is located.
   */
  @IsString()
  @IsNotEmpty()
  state: string;

  /**
   * Postal code for the address.
   */
  @IsPostalCode('any')
  @IsNotEmpty()
  postalCode: string;

  /**
   * Country where the address is located.
   */
  @IsString()
  @IsNotEmpty()
  country: string;

  /**
   * Constructs an AddressDTO instance.
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
    street: string,
    city: string,
    state: string,
    postalCode: string,
    country: string
  ) {
    this.id = id;
    this.userId = userId;
    this.street = street;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
  }
}
