import { Notification } from 'src/domain/entities/notification.entity';
import { fromUserPrisma } from './to.user.entity';

/**
 * Converts a NotificationPrisma to a Notification entity.
 * @param notificationPrisma - The NotificationPrisma to convert.
 * @returns The corresponding Notification entity.
 */
export function fromNotificationPrisma(notificationPrisma: any): Notification {
  return new Notification(
    notificationPrisma.id,
    notificationPrisma.userId,
    notificationPrisma.user
      ? fromUserPrisma(notificationPrisma.user)
      : undefined,
    notificationPrisma.type,
    notificationPrisma.content,
    notificationPrisma.sentAt,
  );
}
