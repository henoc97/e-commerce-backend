import { Injectable } from '@nestjs/common';
import { UserService } from '../../../application/services/user.service';

/**
 * Use case class for deleting a user.
 * This class encapsulates the business logic for user deletion.
 * It interacts with the User service to perform operations on user repository.
 */
@Injectable()
export class DeleteUser {
  constructor(private readonly userService: UserService) { }

  /**
   * Execute the delete-user use case.
   * @param userId - The ID of the user to be deleted.
   * @returns A promise that resolves to a boolean indicating success or failure of deletion.
   */
  async execute(userId: number): Promise<boolean> {
    return this.userService.deleteUser(userId);
  }
}
