import { Injectable } from '@nestjs/common';
import { toUserDTO } from '../../../application/helper/to-dto/to.user.dto';
import { UserService } from '../../../application/services/user.service';
import { UserDTO } from '../../../presentation/dtos/user.dto';

@Injectable()
/**
 * Use case to update a user's password.
 */
export class UpdateUserPasswordUseCase {
  constructor(private readonly userService: UserService) { }

  /**
   * Executes the use case to update the user's password.
   * @param userId - The unique identifier of the user.
   * @param newPassword - The new password to set for the user.
   * @returns Updated UserDTO.
   */
  async execute(userId: number, newPassword: string): Promise<UserDTO> {
    const user = await this.userService.updateUserPassword(userId, newPassword);
    return toUserDTO(user);
  }
}
