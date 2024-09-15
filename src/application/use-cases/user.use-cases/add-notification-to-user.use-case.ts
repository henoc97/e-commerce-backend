import { Injectable } from '@nestjs/common';
import { NotificationDTO } from 'src/presentation/dtos/notification.dto';
import { UserService } from 'src/application/services/user.service';
import { toUserDTO } from 'src/application/helper/to-dto/to.user.dto';
import { UserDTO } from 'src/presentation/dtos/user.dto';

/**
 * Use case class for adding a notification to a user.
 * This class encapsulates the business logic for adding notifications to users.
 * It interacts with the Notification service to perform operations on notification repository.
 */
@Injectable()
export class AddNotificationToUser {
  constructor(private readonly userService: UserService) {}

  /**
   * Execute the add-notification-to-user use case.
   * @param userId - The ID of the user to whom the notification will be added.
   * @param notificationDTO - The NotificationDTO containing the notification data to be added.
   * @returns A promise that resolves to the UserDTO whom added notification.
   */
  async execute(
    userId: number,
    notificationDTO: NotificationDTO,
  ): Promise<UserDTO | null> {
    const user = await this.userService.addNotificationToUser(
      userId,
      notificationDTO,
    );

    if (!user) return null;

    const result = toUserDTO(user);
    return result;
  }
}
