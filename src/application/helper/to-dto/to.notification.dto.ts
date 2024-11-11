import { NotificationDTO } from 'src/presentation/dtos/notification.dto';
import { toUserDTO } from './to.user.dto';

/**
 * Converts a Notification entity to a NotificationDTO.
 * @param notification - The Notification entity to convert.
 * @returns The corresponding NotificationDTO.
 */
export function toNotificationDTO(notification: any): NotificationDTO {
  return new NotificationDTO(
    notification.userId,
    notification.type,
    notification.content,
    notification.read,
    notification.sentAt,
    notification.id,
    notification.user ? toUserDTO(notification.user) : undefined,
  );
}
