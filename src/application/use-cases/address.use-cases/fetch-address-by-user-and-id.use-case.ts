import { Injectable } from '@nestjs/common';
import { toAddressDTO } from 'src/application/helper/to-dto/to.address.dto';
import { AddressService } from 'src/application/services/address.service';
import { AddressDTO } from 'src/presentation/dtos/address.dto';

/**
 * Use case class for fetching an address by user ID and address ID.
 * This class encapsulates the business logic for retrieving addresses based on user and address identifiers.
 */
@Injectable()
export class FetchAddressByUserAndId {
  constructor(private readonly service: AddressService) {}

  /**
   * Execute the fetch-address-by-user-and-id use case.
   * @param userId - The unique identifier of the user.
   * @param addressId - The unique identifier of the address to fetch.
   * @returns A promise that resolves to the AddressDTO if found, otherwise null.
   */
  async execute(userId: number, addressId: number): Promise<AddressDTO | null> {
    const address = await this.service.getAddressByUserIdAndId(
      userId,
      addressId,
    );

    if (!address) return null;

    return toAddressDTO(address);
  }
}
