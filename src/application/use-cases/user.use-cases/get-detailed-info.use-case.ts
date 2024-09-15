import { Injectable } from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';
import { toUserDTO } from 'src/application/helper/to-dto/to.user.dto';
import { UserDTO } from 'src/presentation/dtos/user.dto';

/**
 * Use case class for retrieving detailed information about a user.
 * This class encapsulates the business logic for fetching detailed user information.
 * It interacts with the User service to perform operations on user repository.
 */
@Injectable()
export class GetDetailedInfo {
  constructor(private readonly userService: UserService) {}

  /**
   * Execute the get-detailed-info use case.
   * @param userId - The ID of the user whose detailed information is to be retrieved.
   * @returns A promise that resolves to the UserDTO of the detailed information of the user.
   */
  async execute(userId: number): Promise<UserDTO | null> {
    const user = await this.userService.getUserById(userId);

    if (!user) return null;

    const result = toUserDTO(user);
    return result;
  }
}
