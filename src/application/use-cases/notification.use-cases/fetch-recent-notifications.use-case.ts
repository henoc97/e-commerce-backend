import { Injectable } from '@nestjs/common';
import { NotificationService } from 'src/application/services/notification.service';

/**
 * Use case for fetching recent notifications.
 */
@Injectable()
export class FetchRecentNotifications {
  constructor(private readonly service: NotificationService) {}

  /**
   * Executes the use case.
   * @param userId - The ID of the user whose recent notifications to fetch.
   * @returns The recent notifications of the user.
   */
  async execute(userId: number): Promise<NotificationDTO[]> {
    const notifications = await this.service.getRecentNotifications(userId);
    return notifications.map(toNotificationDTO);
  }
}
