import { Injectable } from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';
import { UserRole } from 'src/domain/enums/user-role.enum';

/**
 * Use case class for retrieving the count of users by role.
 * This class encapsulates the business logic for counting users based on their roles.
 * It interacts with the User service to perform operations on user repository.
 */
@Injectable()
export class GetCountByRole {
  constructor(private readonly userService: UserService) {}

  /**
   * Execute the get-count-by-role use case.
   * @returns A promise that resolves to the count of users by specified role.
   */
  async execute(role: UserRole): Promise<number> {
    return await this.userService.getCountByRole(role);
  }
}
