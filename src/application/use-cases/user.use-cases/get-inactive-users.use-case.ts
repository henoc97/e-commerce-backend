import { Injectable } from '@nestjs/common';
import { toUserDTO } from '../../../application/helper/to-dto/to.user.dto';
import { UserService } from '../../../application/services/user.service';
import { UserDTO } from '../../../presentation/dtos/user.dto';

@Injectable()
/**
 * Use case to retrieve all inactive users.
 */
export class GetInactiveUsersUseCase {
  constructor(private readonly userService: UserService) { }

  /**
   * Executes the use case to fetch inactive users.
   * @returns A list of UserDTOs representing inactive users.
   */
  async execute(days: number): Promise<UserDTO[]> {
    const users = await this.userService.getInactiveUsers(days);
    return users?.map((user) => toUserDTO(user));
  }
}
