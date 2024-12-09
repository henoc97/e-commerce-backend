import { NotificationDTO } from '../../../presentation/dtos/notification.dto';
import { Notification } from '../../../domain/entities/notification.entity';
import { fromUserDTO } from './to.user.entity';

/**
 * Converts a NotificationDTO to a Notification entity.
 * @param notificationDTO - The NotificationDTO to convert.
 * @returns The corresponding Notification entity.
 */
export function fromNotificationDTO(
  notificationDTO: NotificationDTO | Partial<NotificationDTO>,
): Notification {
  return new Notification(
    notificationDTO.id,
    notificationDTO.userId,
    notificationDTO.type,
    notificationDTO.content,
    notificationDTO.user ? fromUserDTO(notificationDTO.user) : undefined,
    notificationDTO.read,
    notificationDTO.sentAt,
  );
}
