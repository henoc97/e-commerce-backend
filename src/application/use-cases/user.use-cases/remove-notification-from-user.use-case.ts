import { Injectable } from '@nestjs/common';
import { toUserDTO } from 'src/application/helper/to-dto/to.user.dto';
import { UserService } from 'src/application/services/user.service';
import { UserDTO } from 'src/presentation/dtos/user.dto';

@Injectable()
/**
 * Use case to remove a notification from a user's profile.
 */
export class RemoveNotificationFromUserUseCase {
  constructor(private readonly userService: UserService) {}

  /**
   * Executes the use case to remove a notification from a user's profile.
   * @param userId - The unique identifier of the user.
   * @param notificationId - The unique identifier of the notification to remove.
   * @returns Updated UserDTO.
   */
  async execute(userId: number, notificationId: number): Promise<UserDTO> {
    const user = await this.userService.removeNotificationFromUser(
      userId,
      notificationId,
    );
    return toUserDTO(user);
  }
}
