import { Injectable } from '@nestjs/common';
import { NotificationService } from 'src/application/services/notification.service';

/**
 * Use case for fetching notifications by user ID.
 */
@Injectable()
export class FetchNotificationsByUserId {
  constructor(private readonly service: NotificationService) {}

  /**
   * Executes the use case.
   * @param userId - The ID of the user whose notifications to fetch.
   * @returns The notifications of the user.
   */
  async execute(userId: number): Promise<NotificationDTO[]> {
    const notifications = await this.service.getNotificationsByUserId(userId);
    return notifications.map(toNotificationDTO);
  }
}
