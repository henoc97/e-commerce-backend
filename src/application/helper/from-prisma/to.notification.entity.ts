﻿import { Notification } from '../../../domain/entities/notification.entity';
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
    notificationPrisma.type,
    notificationPrisma.content,
    notificationPrisma.user
      ? fromUserPrisma(notificationPrisma.user)
      : undefined,
    notificationPrisma.read,
    notificationPrisma.sentAt,
  );
}
