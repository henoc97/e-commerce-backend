import { fromAddressPrisma } from 'src/application/helper/from-prisma/to.address.entity';
import { Address } from 'src/domain/entities/address.entity';
import { IAddressRepository } from 'src/domain/repositories/address.repository';
import prisma from 'prisma/prisma.service';

export class AddressRepository implements IAddressRepository {


  /**
   * Creates a new address in the database.
   * @param {Address} address - The address entity to be created.
   * @returns {Promise<Address>} The created address.
   */
  async create(address: Address): Promise<Address> {
    const { id, user, ...addressData } = address;
    try {
      const result = await prisma.address.create({
        data: addressData,
      });
      return fromAddressPrisma(result);
    } catch (error) {
      console.error('Error creating address:', error);
      throw error;
    }
  }

  /**
   * Retrieves an address by its unique ID.
   * @param {number} id - The ID of the address.
   * @returns {Promise<Address | null>} The address entity or null if not found.
   */
  async getById(id: number): Promise<Address | null> {
    try {
      const result = await prisma.address.findUnique({
        where: { id },
      });
      return fromAddressPrisma(result);
    } catch (error) {
      console.error('Error retrieving address by ID:', error);
      throw error;
    }
  }

  /**
   * Updates an address by its unique ID.
   * @param {number} id - The ID of the address to update.
   * @param {Partial<Address>} updateData - The data to update.
   * @returns {Promise<Address>} The updated address entity.
   */
  async updateById(id: number, updateData: Partial<Address>): Promise<Address> {
    const { user, ...data } = updateData;
    try {
      const result = await prisma.address.update({
        where: { id },
        data: data,
      });
      return fromAddressPrisma(result);
    } catch (error) {
      console.error('Error updating address by ID:', error);
      throw error;
    }
  }

  /**
   * Deletes an address by its unique ID.
   * @param {number} id - The ID of the address to delete.
   * @returns {Promise<boolean>} True if the address was successfully deleted, otherwise false.
   */
  async deleteById(id: number): Promise<boolean> {
    try {
      await prisma.address.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting address:', error);
      return false;
    }
  }

  /**
   * Retrieves all addresses associated with a user by their user ID.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Address[]>} A list of addresses associated with the user.
   */
  async getAllByUserId(userId: number): Promise<Address[]> {
    try {
      const result = await prisma.address.findMany({
        where: { userId },
      });
      return result?.map(fromAddressPrisma);
    } catch (error) {
      console.error('Error retrieving addresses by user ID:', error);
      throw error;
    }
  }

  /**
   * Retrieves an address by its ID and the associated user ID.
   * @param {number} userId - The ID of the user.
   * @param {number} addressId - The ID of the address.
   * @returns {Promise<Address | null>} The address entity or null if not found.
   */
  async getByUserIdAndId(
    userId: number,
    addressId: number,
  ): Promise<Address | null> {
    try {
      const result = await prisma.address.findFirst({
        where: {
          id: addressId,
          userId,
        },
      });
      return fromAddressPrisma(result);
    } catch (error) {
      console.error('Error retrieving address by user and address ID:', error);
      throw error;
    }
  }

  /**
   * Retrieves all addresses in a specific city.
   * @param {string} city - The name of the city.
   * @returns {Promise<Address[]>} A list of addresses located in the city.
   */
  async getByCity(city: string): Promise<Address[]> {
    try {
      const result = await prisma.address.findMany({
        where: { city },
      });
      return result?.map(fromAddressPrisma);
    } catch (error) {
      console.error('Error retrieving addresses by city:', error);
      throw error;
    }
  }

  /**
   * Retrieves all addresses in a specific state.
   * @param {string} state - The name of the state.
   * @returns {Promise<Address[]>} A list of addresses located in the state.
   */
  async getByState(state: string): Promise<Address[]> {
    try {
      const result = await prisma.address.findMany({
        where: { state },
      });
      return result?.map(fromAddressPrisma);
    } catch (error) {
      console.error('Error retrieving addresses by state:', error);
      throw error;
    }
  }

  /**
   * Retrieves all addresses in a specific country.
   * @param {string} country - The name of the country.
   * @returns {Promise<Address[]>} A list of addresses located in the country.
   */
  async getByCountry(country: string): Promise<Address[]> {
    try {
      const result = await prisma.address.findMany({
        where: { country },
      });
      return result?.map(fromAddressPrisma);
    } catch (error) {
      console.error('Error retrieving addresses by country:', error);
      throw error;
    }
  }

  /**
   * Retrieves all addresses with a specific postal code.
   * @param {string} postalCode - The postal code to search for.
   * @returns {Promise<Address[]>} A list of addresses with the given postal code.
   */
  async getByPostalCode(postalCode: string): Promise<Address[]> {
    try {
      const result = await prisma.address.findMany({
        where: { postalCode },
      });
      return result?.map(fromAddressPrisma);
    } catch (error) {
      console.error('Error retrieving addresses by postal code:', error);
      throw error;
    }
  }
}
