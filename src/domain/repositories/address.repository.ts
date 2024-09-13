import { Address } from "../entities/address.entity";

/**
 * Interface defining the contract for Address repository operations.
 */
export interface IAddressRepository {
  
  /**
   * Creates a new address entry.
   * @param address - The address entity to be created.
   * @returns A promise that resolves to the created address entity.
   */
  create(address: Address): Promise<Address>;

  /**
   * Retrieves an address by its unique identifier.
   * @param id - The unique identifier of the address.
   * @returns A promise that resolves to the address if found, otherwise null.
   */
  getById(id: number): Promise<Address | null>;

  /**
   * Updates an existing address identified by its unique identifier.
   * @param id - The unique identifier of the address to be updated.
   * @param updateData - Partial data to update the address with.
   * @returns A promise that resolves to the updated address entity.
   */
  updateById(id: number, updateData: Partial<Address>): Promise<Address>;

  /**
   * Deletes an address entry by its unique identifier.
   * @param id - The unique identifier of the address to be deleted.
   * @returns A promise that resolves to true if the deletion was successful, otherwise false.
   */
  deleteById(id: number): Promise<boolean>;

  /**
   * Retrieves all addresses associated with a specific user.
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves to an array of addresses associated with the user.
   */
  getAllByUserId(userId: number): Promise<Address[]>;

  /**
   * Retrieves a specific address for a user by address identifier.
   * @param userId - The unique identifier of the user.
   * @param addressId - The unique identifier of the address.
   * @returns A promise that resolves to the address if found, otherwise null.
   */
  getByUserIdAndId(userId: number, addressId: number): Promise<Address | null>;

  /**
   * Retrieves addresses located in a specific city.
   * @param city - The name of the city.
   * @returns A promise that resolves to an array of addresses located in the specified city.
   */
  getByCity(city: string): Promise<Address[]>;

  /**
   * Retrieves addresses located in a specific state.
   * @param state - The name of the state.
   * @returns A promise that resolves to an array of addresses located in the specified state.
   */
  getByState(state: string): Promise<Address[]>;

  /**
   * Retrieves addresses located in a specific country.
   * @param country - The name of the country.
   * @returns A promise that resolves to an array of addresses located in the specified country.
   */
  getByCountry(country: string): Promise<Address[]>;

  /**
   * Retrieves addresses with a specific postal code.
   * @param postalCode - The postal code to search for.
   * @returns A promise that resolves to an array of addresses with the specified postal code.
   */
  getByPostalCode(postalCode: string): Promise<Address[]>;

}
