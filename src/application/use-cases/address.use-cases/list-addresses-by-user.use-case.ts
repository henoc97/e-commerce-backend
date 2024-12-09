import { Injectable } from '@nestjs/common';
import { toAddressDTO } from '../../../application/helper/to-dto/to.address.dto';
import { AddressService } from '../../../application/services/address.service';
import { AddressDTO } from '../../../presentation/dtos/address.dto';

/**
 * Use case class for listing addresses by user ID.
 * This class encapsulates the business logic for retrieving addresses associated with a specific user.
 */
@Injectable()
export class ListAddressesByUser {
  constructor(private readonly service: AddressService) { }

  /**
   * Execute the list-addresses-by-user use case.
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves to an array of AddressDTOs associated with the specified user.
   */
  async execute(userId: number): Promise<AddressDTO[]> {
    const addresses = await this.service.getAddressesByUserId(userId);

    return addresses?.map((address) => toAddressDTO(address));
  }
}
