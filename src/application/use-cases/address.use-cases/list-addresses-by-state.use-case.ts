import { Injectable } from '@nestjs/common';
import { toAddressDTO } from '../../../application/helper/to-dto/to.address.dto';
import { AddressService } from '../../../application/services/address.service';
import { AddressDTO } from '../../../presentation/dtos/address.dto';

/**
 * Use case class for listing addresses by state.
 * This class encapsulates the business logic for retrieving addresses located in a specific state.
 */
@Injectable()
export class ListAddressesByState {
  constructor(private readonly service: AddressService) { }

  /**
   * Execute the list-addresses-by-state use case.
   * @param state - The name of the state to search for.
   * @returns A promise that resolves to an array of AddressDTOs located in the specified state.
   */
  async execute(state: string): Promise<AddressDTO[]> {
    const addresses = await this.service.getAddressesByState(state);

    return addresses?.map((address) => toAddressDTO(address));
  }
}
