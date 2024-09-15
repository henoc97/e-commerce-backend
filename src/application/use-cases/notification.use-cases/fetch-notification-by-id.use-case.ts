import { Injectable } from '@nestjs/common';
import { NotificationService } from 'src/application/services/notification.service';

/**
 * Use case for fetching a notification by its ID.
 */
@Injectable()
export class FetchNotificationById {
  constructor(private readonly service: NotificationService) {}

  /**
   * Executes the use case.
   * @param notificationId - The ID of the notification to fetch.
   * @returns The fetched notification.
   */
  async execute(notificationId: number): Promise<NotificationDTO | null> {
    const notification = await this.service.getNotificationById(notificationId);
    return notification ? toNotificationDTO(notification) : null;
  }
}
