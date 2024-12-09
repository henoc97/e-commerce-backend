import { Injectable } from '@nestjs/common';
import { UserService } from '../../../application/services/user.service';

/**
 * Use case class for retrieving the count of active users.
 * This class encapsulates the business logic for counting active users.
 * It interacts with the User service to perform operations on user repository.
 */
@Injectable()
export class GetActiveCount {
  constructor(private readonly userService: UserService) { }

  /**
   * Execute the get-active-count use case.
   * @returns A promise that resolves to the count of active users.
   */
  async execute(): Promise<number> {
    return this.userService.getActiveCount();
  }
}
