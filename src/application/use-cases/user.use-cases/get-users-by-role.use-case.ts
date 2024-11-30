import { Injectable } from '@nestjs/common';
import { toUserDTO } from 'src/application/helper/to-dto/to.user.dto';
import { UserService } from 'src/application/services/user.service';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { UserDTO } from 'src/presentation/dtos/user.dto';

@Injectable()
/**
 * Use case to retrieve users by role.
 */
export class GetUsersByRoleUseCase {
  constructor(private readonly userService: UserService) { }

  /**
   * Executes the use case to fetch users by their role.
   * @param role - The role to filter users by.
   * @returns A list of UserDTOs matching the specified role.
   */
  async execute(role: UserRole): Promise<UserDTO[]> {
    const users = await this.userService.getUsersByRole(role);
    return users?.map((user) => toUserDTO(user));
  }
}
