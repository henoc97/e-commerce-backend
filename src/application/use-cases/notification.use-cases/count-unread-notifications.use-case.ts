import { Injectable } from '@nestjs/common';
import { NotificationService } from 'src/application/services/notification.service';

/**
 * Use case for counting unread notifications for a user.
 */
@Injectable()
export class CountUnreadNotifications {
  constructor(private readonly service: NotificationService) {}

  /**
   * Executes the use case.
   * @param userId - The unique ID of the user.
   * @returns The count of unread notifications.
   */
  async execute(userId: number): Promise<number> {
    return this.service.countUnreadNotifications(userId);
  }
}
