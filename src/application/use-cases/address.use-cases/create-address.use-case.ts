import { Injectable } from '@nestjs/common';
import { toAddressDTO } from '../../../application/helper/to-dto/to.address.dto';
import { AddressService } from '../../../application/services/address.service';
import { AddressDTO } from '../../../presentation/dtos/address.dto';

/**
 * Use case class for managing addresses.
 * This class encapsulates the business logic for creating addresses.
 * It interacts with the Address service to perform operations on address repository.
 */
@Injectable()
export class CreateAddress {
  constructor(private readonly service: AddressService) { }

  /**
   * Execute the create-address use case.
   * @param addressDTO - The AddressDTO containing the address data to be created.
   * @returns A promise that resolves to the created Address entity.
   */
  async execute(addressDTO: AddressDTO): Promise<AddressDTO | null> {
    const address = await this.service.createAddress(addressDTO);

    if (!address) return null;

    const result = toAddressDTO(address);
    return result;
  }
}
