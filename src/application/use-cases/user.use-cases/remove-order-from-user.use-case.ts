import { Injectable } from '@nestjs/common';
import { toUserDTO } from 'src/application/helper/to-dto/to.user.dto';
import { UserService } from 'src/application/services/user.service';
import { UserDTO } from 'src/presentation/dtos/user.dto';

@Injectable()
/**
 * Use case to remove an order from a user's profile.
 */
export class RemoveOrderFromUserUseCase {
  constructor(private readonly userService: UserService) {}

  /**
   * Executes the use case to remove an order from a user's profile.
   * @param userId - The unique identifier of the user.
   * @param orderId - The unique identifier of the order to remove.
   * @returns Updated UserDTO.
   */
  async execute(userId: number, orderId: number): Promise<UserDTO> {
    const user = await this.userService.removeOrderFromUser(userId, orderId);
    return toUserDTO(user);
  }
}
