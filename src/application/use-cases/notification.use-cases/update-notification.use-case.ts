import { Injectable } from '@nestjs/common';
import { toNotificationDTO } from 'src/application/helper/to-dto/to.notification.dto';
import { NotificationService } from 'src/application/services/notification.service';
import { NotificationDTO } from 'src/presentation/dtos/notification.dto';

/**
 * Use case for updating a notification.
 */
@Injectable()
export class UpdateNotification {
  constructor(private readonly service: NotificationService) {}

  /**
   * Executes the use case.
   * @param notificationId - The ID of the notification to update.
   * @param updates - The updates to apply to the notification.
   * @returns The updated notification.
   */
  async execute(
    notificationId: number,
    updates: Partial<NotificationDTO>,
  ): Promise<NotificationDTO | null> {
    const notification = await this.service.updateNotification(
      notificationId,
      updates,
    );
    return notification ? toNotificationDTO(notification) : null;
  }
}
