import { Injectable } from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';
import { toUserDTO } from 'src/application/helper/to-dto/to.user.dto';
import { UserDTO } from 'src/presentation/dtos/user.dto';

/**
 * Use case class for retrieving a user.
 * This class encapsulates the business logic for retrieving a user.
 * It interacts with the User service to perform operations on user repository.
 */
@Injectable()
export class GetUser {
  constructor(private readonly userService: UserService) {}

  /**
   * Execute the get-user use case.
   * @param userId - The ID of the user to be retrieved.
   * @returns A promise that resolves to the UserDTO of the retrieved user.
   */
  async execute(userId: number): Promise<UserDTO | null> {
    const user = await this.userService.getUserById(userId);

    if (!user) return null;

    const result = toUserDTO(user);
    return result;
  }
}
