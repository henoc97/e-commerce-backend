import { Injectable } from '@nestjs/common';
import { toUserDTO } from '../../../application/helper/to-dto/to.user.dto';
import { UserService } from '../../../application/services/user.service';
import { UserDTO } from '../../../presentation/dtos/user.dto';

@Injectable()
/**
 * Use case to remove an address from a user's profile.
 */
export class RemoveAddressFromUserUseCase {
  constructor(private readonly userService: UserService) { }

  /**
   * Executes the use case to remove an address from a user's profile.
   * @param userId - The unique identifier of the user.
   * @param addressId - The unique identifier of the address to remove.
   * @returns Updated UserDTO.
   */
  async execute(userId: number, addressId: number): Promise<UserDTO> {
    const user = await this.userService.removeAddressFromUser(
      userId,
      addressId,
    );
    return toUserDTO(user);
  }
}
