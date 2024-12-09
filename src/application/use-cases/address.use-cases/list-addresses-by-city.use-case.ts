import { Injectable } from '@nestjs/common';
import { toAddressDTO } from '../../../application/helper/to-dto/to.address.dto';
import { AddressService } from '../../../application/services/address.service';
import { AddressDTO } from '../../../presentation/dtos/address.dto';

/**
 * Use case class for listing addresses by city.
 * This class encapsulates the business logic for retrieving addresses located in a specific city.
 */
@Injectable()
export class ListAddressesByCity {
  constructor(private readonly service: AddressService) { }

  /**
   * Execute the list-addresses-by-city use case.
   * @param city - The name of the city to search for.
   * @returns A promise that resolves to an array of AddressDTOs located in the specified city.
   */
  async execute(city: string): Promise<AddressDTO[]> {
    const addresses = await this.service.getAddressesByCity(city);

    return addresses?.map((address) => toAddressDTO(address));
  }
}
