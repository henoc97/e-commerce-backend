import { Injectable } from '@nestjs/common';
import { toUserDTO } from 'src/application/helper/to-dto/to.user.dto';
import { UserService } from 'src/application/services/user.service';
import { UserDTO } from 'src/presentation/dtos/user.dto';

@Injectable()
/**
 * Use case to retrieve a user by their email.
 */
export class GetUserByEmailUseCase {
  constructor(private readonly userService: UserService) {}

  /**
   * Executes the use case to fetch a user by their email address.
   * @param email - The email address of the user.
   * @returns The UserDTO if found, otherwise null.
   */
  async execute(email: string): Promise<UserDTO | null> {
    const user = await this.userService.getUserByEmail(email);
    return user ? toUserDTO(user) : null;
  }
}
