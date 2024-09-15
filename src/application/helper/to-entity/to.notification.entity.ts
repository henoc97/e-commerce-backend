import { NotificationDTO } from 'src/presentation/dtos/notification.dto';
import { Notification } from 'src/domain/entities/notification.entity';
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
    notificationDTO.user ? fromUserDTO(notificationDTO.user) : undefined,
    notificationDTO.type,
    notificationDTO.content,
    notificationDTO.sentAt,
  );
}
