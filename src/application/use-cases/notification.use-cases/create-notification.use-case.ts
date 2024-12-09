import { Injectable } from '@nestjs/common';
import { toNotificationDTO } from '../../../application/helper/to-dto/to.notification.dto';
import { NotificationService } from '../../../application/services/notification.service';
import { NotificationDTO } from '../../../presentation/dtos/notification.dto';

/**
 * Use case for creating a new notification.
 */
@Injectable()
export class CreateNotification {
  constructor(private readonly service: NotificationService) { }

  /**
   * Executes the use case.
   * @param notificationDTO - The data for creating the notification.
   * @returns The created notification.
   */
  async execute(
    notificationDTO: NotificationDTO,
  ): Promise<NotificationDTO | null> {
    const notification = await this.service.createNotification(notificationDTO);
    return notification ? toNotificationDTO(notification) : null;
  }
}
