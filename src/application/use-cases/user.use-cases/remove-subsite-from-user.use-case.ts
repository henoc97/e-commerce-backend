import { Injectable } from '@nestjs/common';
import { toUserDTO } from 'src/application/helper/to-dto/to.user.dto';
import { UserService } from 'src/application/services/user.service';
import { UserDTO } from 'src/presentation/dtos/user.dto';

@Injectable()
/**
 * Use case to remove a sub-site from a user's profile.
 */
export class RemoveSubsiteFromUserUseCase {
  constructor(private readonly userService: UserService) {}

  /**
   * Executes the use case to remove a sub-site from a user's profile.
   * @param userId - The unique identifier of the user.
   * @param SubsiteId - The unique identifier of the sub-site to remove.
   * @returns Updated UserDTO.
   */
  async execute(userId: number, SubsiteId: number): Promise<UserDTO> {
    const user = await this.userService.removeSubsiteFromUser(
      userId,
      SubsiteId,
    );
    return toUserDTO(user);
  }
}
