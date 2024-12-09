import { Injectable } from '@nestjs/common';
import { toAddressDTO } from '../../../application/helper/to-dto/to.address.dto';
import { AddressService } from '../../../application/services/address.service';
import { AddressDTO } from '../../../presentation/dtos/address.dto';

/**
 * Use case class for modifying an address by ID.
 * This class encapsulates the business logic for updating an address with a given identifier.
 */
@Injectable()
export class ModifyAddressById {
  constructor(private readonly service: AddressService) { }

  /**
   * Execute the modify-address-by-id use case.
   * @param id - The unique identifier of the address to be modified.
   * @param addressDTO - The AddressDTO containing the updated address data.
   * @returns A promise that resolves to the updated AddressDTO.
   */
  async execute(id: number, addressDTO: AddressDTO): Promise<AddressDTO> {
    const updatedAddress = await this.service.updateAddressById(id, addressDTO);

    return toAddressDTO(updatedAddress);
  }
}
