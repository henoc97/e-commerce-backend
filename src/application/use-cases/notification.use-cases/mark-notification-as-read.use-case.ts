import { Injectable } from '@nestjs/common';
import { toNotificationDTO } from 'src/application/helper/to-dto/to.notification.dto';
import { NotificationService } from 'src/application/services/notification.service';
import { NotificationDTO } from 'src/presentation/dtos/notification.dto';

/**
 * Use case for marking a notification as read.
 */
@Injectable()
export class MarkNotificationAsRead {
  constructor(private readonly service: NotificationService) {}

  /**
   * Executes the use case.
   * @param notificationId - The ID of the notification to mark as read.
   * @returns The updated notification.
   */
  async execute(notificationId: number): Promise<NotificationDTO | null> {
    const notification =
      await this.service.markNotificationAsRead(notificationId);
    return notification ? toNotificationDTO(notification) : null;
  }
}
