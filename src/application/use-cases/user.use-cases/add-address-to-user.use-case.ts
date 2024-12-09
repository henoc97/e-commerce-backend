import { Injectable } from '@nestjs/common';
import { AddressDTO } from '../../../presentation/dtos/address.dto';
import { UserService } from '../../../application/services/user.service';
import { toUserDTO } from '../../../application/helper/to-dto/to.user.dto';
import { UserDTO } from '../../../presentation/dtos/user.dto';

/**
 * Use case class for adding an address to a user.
 * This class encapsulates the business logic for adding addresses to users.
 * It interacts with the Address service to perform operations on address repository.
 */
@Injectable()
export class AddAddressToUser {
  constructor(private readonly userService: UserService) { }

  /**
   * Execute the add-address-to-user use case.
   * @param userId - The ID of the user to whom the address will be added.
   * @param addressDTO - The AddressDTO containing the address data to be added.
   * @returns A promise that resolves to the UserDTO whom added address.
   */
  async execute(
    userId: number,
    addressDTO: AddressDTO,
  ): Promise<UserDTO | null> {
    const user = await this.userService.addAddressToUser(userId, addressDTO);

    if (!user) return null;

    const result = toUserDTO(user);
    return result;
  }
}
