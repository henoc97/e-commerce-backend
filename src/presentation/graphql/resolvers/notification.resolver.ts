import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CountUnreadNotifications } from 'src/application/use-cases/notification.use-cases/count-unread-notifications.use-case';
import { CreateNotification } from 'src/application/use-cases/notification.use-cases/create-notification.use-case';
import { DeleteNotification } from 'src/application/use-cases/notification.use-cases/delete-notification.use-case';
import { FetchNotificationById } from 'src/application/use-cases/notification.use-cases/fetch-notification-by-id.use-case';
import { FetchNotificationsByDateRange } from 'src/application/use-cases/notification.use-cases/fetch-notifications-by-date-range.use-case';
import { FetchNotificationsByType } from 'src/application/use-cases/notification.use-cases/fetch-notifications-by-type.use-case';
import { FetchNotificationsByUserId } from 'src/application/use-cases/notification.use-cases/fetch-notifications-by-user-id.use-case';
import { FetchRecentNotifications } from 'src/application/use-cases/notification.use-cases/fetch-recent-notifications.use-case';
import { MarkNotificationAsRead } from 'src/application/use-cases/notification.use-cases/mark-notification-as-read.use-case';
import { UpdateNotification } from 'src/application/use-cases/notification.use-cases/update-notification.use-case';
import { NotificationDTO } from 'src/presentation/dtos/notification.dto';
import { NotificationType } from 'src/domain/enums/notification-type.enum';

@Resolver('Notification')
export class NotificationResolver {
  constructor(
    private readonly countUnreadNotificationsUseCase: CountUnreadNotifications,
    private readonly createNotificationUseCase: CreateNotification,
    private readonly deleteNotificationUseCase: DeleteNotification,
    private readonly fetchNotificationByIdUseCase: FetchNotificationById,
    private readonly fetchNotificationsByDateRangeUseCase: FetchNotificationsByDateRange,
    private readonly fetchNotificationsByTypeUseCase: FetchNotificationsByType,
    private readonly fetchNotificationsByUserIdUseCase: FetchNotificationsByUserId,
    private readonly fetchRecentNotificationsUseCase: FetchRecentNotifications,
    private readonly markNotificationAsReadUseCase: MarkNotificationAsRead,
    private readonly updateNotificationUseCase: UpdateNotification,
  ) {}

  @Query(() => Number)
  async countUnreadNotifications(@Args('userId') userId: number): Promise<number> {
    return this.countUnreadNotificationsUseCase.execute(userId);
  }

  @Mutation(() => NotificationDTO)
  async createNotification(@Args('notificationDTO') notificationDTO: NotificationDTO): Promise<NotificationDTO | null> {
    return this.createNotificationUseCase.execute(notificationDTO);
  }

  @Mutation(() => Boolean)
  async deleteNotification(@Args('notificationId') notificationId: number): Promise<boolean> {
    return this.deleteNotificationUseCase.execute(notificationId);
  }

  @Query(() => NotificationDTO, { nullable: true })
  async fetchNotificationById(@Args('notificationId') notificationId: number): Promise<NotificationDTO | null> {
    return this.fetchNotificationByIdUseCase.execute(notificationId);
  }

  @Query(() => [NotificationDTO])
  async fetchNotificationsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<NotificationDTO[]> {
    return this.fetchNotificationsByDateRangeUseCase.execute(startDate, endDate);
  }

  @Query(() => [NotificationDTO])
  async fetchNotificationsByType(@Args('type') type: NotificationType): Promise<NotificationDTO[]> {
    return this.fetchNotificationsByTypeUseCase.execute(type);
  }

  @Query(() => [NotificationDTO])
  async fetchNotificationsByUserId(@Args('userId') userId: number): Promise<NotificationDTO[]> {
    return this.fetchNotificationsByUserIdUseCase.execute(userId);
  }

  @Query(() => [NotificationDTO])
  async fetchRecentNotifications(@Args('userId') userId: number): Promise<NotificationDTO[]> {
    return this.fetchRecentNotificationsUseCase.execute(userId);
  }

  @Mutation(() => NotificationDTO, { nullable: true })
  async markNotificationAsRead(@Args('notificationId') notificationId: number): Promise<NotificationDTO | null> {
    return this.markNotificationAsReadUseCase.execute(notificationId);
  }

  @Mutation(() => NotificationDTO, { nullable: true })
  async updateNotification(
    @Args('notificationId') notificationId: number,
    @Args('updates') updates: Partial<NotificationDTO>,
  ): Promise<NotificationDTO | null> {
    return this.updateNotificationUseCase.execute(notificationId, updates);
  }
}

