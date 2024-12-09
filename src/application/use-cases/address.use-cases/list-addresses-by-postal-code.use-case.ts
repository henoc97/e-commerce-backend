import { Injectable } from '@nestjs/common';
import { toAddressDTO } from '../../../application/helper/to-dto/to.address.dto';
import { AddressService } from '../../../application/services/address.service';
import { AddressDTO } from '../../../presentation/dtos/address.dto';

/**
 * Use case class for listing addresses by postal code.
 * This class encapsulates the business logic for retrieving addresses with a specific postal code.
 */
@Injectable()
export class ListAddressesByPostalCode {
  constructor(private readonly service: AddressService) { }

  /**
   * Execute the list-addresses-by-postal-code use case.
   * @param postalCode - The postal code to search for.
   * @returns A promise that resolves to an array of AddressDTOs with the specified postal code.
   */
  async execute(postalCode: string): Promise<AddressDTO[]> {
    const addresses = await this.service.getAddressesByPostalCode(postalCode);

    return addresses?.map((address) => toAddressDTO(address));
  }
}
