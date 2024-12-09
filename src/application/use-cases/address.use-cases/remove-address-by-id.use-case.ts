import { Injectable } from '@nestjs/common';
import { AddressService } from '../../../application/services/address.service';

/**
 * Use case class for removing an address by ID.
 * This class encapsulates the business logic for deleting an address with a given identifier.
 */
@Injectable()
export class RemoveAddressById {
  constructor(private readonly service: AddressService) { }

  /**
   * Execute the remove-address-by-id use case.
   * @param id - The unique identifier of the address to be removed.
   * @returns A promise that resolves to a boolean indicating whether the removal was successful.
   */
  async execute(id: number): Promise<boolean> {
    return this.service.deleteAddressById(id);
  }
}
