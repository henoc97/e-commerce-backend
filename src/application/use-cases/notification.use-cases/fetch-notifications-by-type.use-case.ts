import { Injectable } from '@nestjs/common';
import { NotificationService } from 'src/application/services/notification.service';
import { NotificationType } from 'src/domain/enums/notification-type.enum';

/**
 * Use case for fetching notifications by type.
 */
@Injectable()
export class FetchNotificationsByType {
  constructor(private readonly service: NotificationService) {}

  /**
   * Executes the use case.
   * @param type - The type of notifications to fetch.
   * @returns The notifications of the given type.
   */
  async execute(type: NotificationType): Promise<NotificationDTO[]> {
    const notifications = await this.service.getNotificationsByType(type);
    return notifications.map(toNotificationDTO);
  }
}
