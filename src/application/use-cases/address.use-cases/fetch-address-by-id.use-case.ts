import { Injectable } from '@nestjs/common';
import { toAddressDTO } from '../../../application/helper/to-dto/to.address.dto';
import { AddressService } from '../../../application/services/address.service';
import { AddressDTO } from '../../../presentation/dtos/address.dto';

/**
 * Use case class for fetching an address by ID.
 * This class encapsulates the business logic for retrieving addresses by their unique identifier.
 */
@Injectable()
export class FetchAddressById {
  constructor(private readonly service: AddressService) { }

  /**
   * Execute the fetch-address-by-id use case.
   * @param id - The unique identifier of the address to fetch.
   * @returns A promise that resolves to the AddressDTO if found, otherwise null.
   */
  async execute(id: number): Promise<AddressDTO | null> {
    const address = await this.service.getAddressById(id);

    if (!address) return null;

    return toAddressDTO(address);
  }
}
