import { Injectable } from '@nestjs/common';
import { NotificationService } from 'src/application/services/notification.service';

/**
 * Use case for deleting a notification by ID.
 */
@Injectable()
export class DeleteNotification {
  constructor(private readonly service: NotificationService) {}

  /**
   * Executes the use case.
   * @param notificationId - The ID of the notification to delete.
   * @returns A boolean indicating success or failure.
   */
  async execute(notificationId: number): Promise<boolean> {
    return await this.service.deleteNotification(notificationId);
  }
}
