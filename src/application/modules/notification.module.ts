import { Module } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { NotificationRepository } from 'src/infrastructure/persistences/notification.repository.impl';
import { CreateNotification } from '../use-cases/notification.use-cases/create-notification.use-case';
import { CountUnreadNotifications } from '../use-cases/notification.use-cases/count-unread-notifications.use-case';
import { UpdateNotification } from '../use-cases/notification.use-cases/update-notification.use-case';
import { FetchRecentNotifications } from '../use-cases/notification.use-cases/fetch-recent-notifications.use-case';
import { FetchNotificationsByUserId } from '../use-cases/notification.use-cases/fetch-notifications-by-user-id.use-case';
import { MarkNotificationAsRead } from '../use-cases/notification.use-cases/mark-notification-as-read.use-case';
import { DeleteNotification } from '../use-cases/notification.use-cases/delete-notification.use-case';
import { FetchNotificationById } from '../use-cases/notification.use-cases/fetch-notification-by-id.use-case';
import { FetchNotificationsByType } from '../use-cases/notification.use-cases/fetch-notifications-by-type.use-case';
import { FetchNotificationsByDateRange } from '../use-cases/notification.use-cases/fetch-notifications-by-date-range.use-case';

const notificationUseCases = [
  CreateNotification,
  CountUnreadNotifications,
  UpdateNotification,
  FetchRecentNotifications,
  FetchNotificationsByUserId,
  MarkNotificationAsRead,
  DeleteNotification,
  FetchNotificationById,
  FetchNotificationsByType,
  FetchNotificationsByDateRange,
];

@Module({
  providers: [
    NotificationService,

    {
      provide: 'INotificationRepository',
      useClass: NotificationRepository,
    },
    ...notificationUseCases,
  ],
  exports: [NotificationService, ...notificationUseCases],
})
export class NotificationModule { }
