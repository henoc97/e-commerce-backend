import { Injectable } from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';
import { toUserDTO } from 'src/application/helper/to-dto/to.user.dto';
import { UserDTO } from 'src/presentation/dtos/user.dto';

/**
 * Use case class for updating a user.
 * This class encapsulates the business logic for updating user information.
 * It interacts with the User service to perform operations on user repository.
 */
@Injectable()
export class UpdateUser {
  constructor(private readonly userService: UserService) {}

  /**
   * Execute the update-user use case.
   * @param userId - The ID of the user to be updated.
   * @param userDTO - Partial fields to update.
   * @returns A promise that resolves to the updated UserDTO.
   */
  async execute(
    userId: number,
    userDTO: Partial<UserDTO>,
  ): Promise<UserDTO | null> {
    const user = await this.userService.updateUser(userId, userDTO);

    if (!user) return null;

    const result = toUserDTO(user);
    return result;
  }
}
