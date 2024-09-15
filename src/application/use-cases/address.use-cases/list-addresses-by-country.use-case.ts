import { Injectable } from '@nestjs/common';
import { toAddressDTO } from 'src/application/helper/to-dto/to.address.dto';
import { AddressService } from 'src/application/services/address.service';
import { AddressDTO } from 'src/presentation/dtos/address.dto';

/**
 * Use case class for listing addresses by country.
 * This class encapsulates the business logic for retrieving addresses located in a specific country.
 */
@Injectable()
export class ListAddressesByCountry {
  constructor(private readonly service: AddressService) {}

  /**
   * Execute the list-addresses-by-country use case.
   * @param country - The name of the country to search for.
   * @returns A promise that resolves to an array of AddressDTOs located in the specified country.
   */
  async execute(country: string): Promise<AddressDTO[]> {
    const addresses = await this.service.getAddressesByCountry(country);

    return addresses.map((address) => toAddressDTO(address));
  }
}
