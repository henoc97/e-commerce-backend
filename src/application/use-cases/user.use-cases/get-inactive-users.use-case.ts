import { Injectable } from '@nestjs/common';
import { toUserDTO } from 'src/application/helper/to-dto/to.user.dto';
import { UserService } from 'src/application/services/user.service';
import { UserDTO } from 'src/presentation/dtos/user.dto';

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
