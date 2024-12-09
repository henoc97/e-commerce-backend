import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Address } from '../../domain/entities/address.entity';
import { IAddressRepository } from '../../domain/repositories/address.repository';
import { AddressDTO } from '../../presentation/dtos/address.dto';
import { fromAddressDTO } from '../helper/to-entity/to.address.entity';

/**
 * Service class for managing addresses.
 * Implements the business logic for interacting with the Address repository.
 */
@Injectable()
export class AddressService {
  constructor(
    @Inject('IAddressRepository')
    private readonly addressRepository: IAddressRepository,
  ) { }

  /**
   * Creates a new address entry.
   * @param addressDTO - The AddressDTO containing the address data to be created.
   * @returns A promise that resolves to the created Address entity.
   */
  async createAddress(addressDTO: AddressDTO): Promise<Address> {
    const address = fromAddressDTO(addressDTO);
    return await this.addressRepository.create(address);
  }

  /**
   * Retrieves an address by its unique identifier.
   * @param id - The unique identifier of the address.
   * @returns A promise that resolves to the Address entity if found, otherwise null.
   */
  async getAddressById(id: number): Promise<Address | null> {
    return await this.addressRepository.getById(id);
  }

  /**
   * Updates an existing address identified by its unique identifier.
   * @param id - The unique identifier of the address to be updated.
   * @param data - Partial AddressDTO containing the data to update.
   * @returns A promise that resolves to the updated Address entity.
   */
  async updateAddressById(
    id: number,
    data: Partial<AddressDTO>,
  ): Promise<Address> {
    const updateData = fromAddressDTO(data);
    return await this.addressRepository.updateById(id, updateData);
  }

  /**
   * Deletes an address entry by its unique identifier.
   * @param id - The unique identifier of the address to be deleted.
   * @returns A promise that resolves to true if the deletion was successful, otherwise false.
   */
  async deleteAddressById(id: number): Promise<boolean> {
    return await this.addressRepository.deleteById(id);
  }

  /**
   * Retrieves all addresses associated with a specific user.
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves to an array of Address entities associated with the user.
   */
  async getAddressesByUserId(userId: number): Promise<Address[]> {
    return this.addressRepository.getAllByUserId(userId);
  }

  /**
   * Retrieves a specific address for a user by address identifier.
   * @param userId - The unique identifier of the user.
   * @param addressId - The unique identifier of the address.
   * @returns A promise that resolves to the Address entity if found, otherwise null.
   */
  async getAddressByUserIdAndId(
    userId: number,
    addressId: number,
  ): Promise<Address | null> {
    return this.addressRepository.getByUserIdAndId(userId, addressId);
  }

  /**
   * Retrieves addresses located in a specific city.
   * @param city - The name of the city.
   * @returns A promise that resolves to an array of Address entities located in the specified city.
   */
  async getAddressesByCity(city: string): Promise<Address[]> {
    return this.addressRepository.getByCity(city);
  }

  /**
   * Retrieves addresses located in a specific state.
   * @param state - The name of the state.
   * @returns A promise that resolves to an array of Address entities located in the specified state.
   */
  async getAddressesByState(state: string): Promise<Address[]> {
    return this.addressRepository.getByState(state);
  }

  /**
   * Retrieves addresses located in a specific country.
   * @param country - The name of the country.
   * @returns A promise that resolves to an array of Address entities located in the specified country.
   */
  async getAddressesByCountry(country: string): Promise<Address[]> {
    return this.addressRepository.getByCountry(country);
  }

  /**
   * Retrieves addresses with a specific postal code.
   * @param postalCode - The postal code to search for.
   * @returns A promise that resolves to an array of Address entities with the specified postal code.
   */
  async getAddressesByPostalCode(postalCode: string): Promise<Address[]> {
    return this.addressRepository.getByPostalCode(postalCode);
  }
}
