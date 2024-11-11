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
import { Notification } from 'src/generated/graphql';
import { NotificationType } from 'src/domain/enums/notification-type.enum';
import { transformNotificationDTOToGraphQL } from 'src/application/helper/utils/transformers';

@Resolver(() => 'Notification')
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
  ) { }

  @Query(() => Number)
  async countUnreadNotifications(
    @Args('userId') userId: number,
  ): Promise<number> {
    return this.countUnreadNotificationsUseCase.execute(userId);
  }

  @Mutation(() => 'Notification')
  async createNotification(
    @Args('notificationDTO') notificationDTO: NotificationDTO,
  ): Promise<Notification | null> {
    const result = await this.createNotificationUseCase.execute(notificationDTO);
    return transformNotificationDTOToGraphQL(result)
  }

  @Mutation(() => Boolean)
  async deleteNotification(
    @Args('notificationId') notificationId: number,
  ): Promise<boolean> {
    return this.deleteNotificationUseCase.execute(notificationId);
  }

  @Query(() => 'Notification', { nullable: true })
  async fetchNotificationById(
    @Args('notificationId') notificationId: number,
  ): Promise<Notification | null> {
    const result = await this.fetchNotificationByIdUseCase.execute(notificationId);
    return transformNotificationDTOToGraphQL(result)
  }

  @Query(() => [NotificationDTO])
  async fetchNotificationsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<Notification[]> {
    const result = await this.fetchNotificationsByDateRangeUseCase.execute(
      startDate,
      endDate,
    );
    return result.map(transformNotificationDTOToGraphQL)
  }

  @Query(() => [NotificationDTO])
  async fetchNotificationsByType(
    @Args('type') type: NotificationType,
  ): Promise<Notification[]> {
    const result = await this.fetchNotificationsByTypeUseCase.execute(type);
    return result.map(transformNotificationDTOToGraphQL)
  }

  @Query(() => [NotificationDTO])
  async fetchNotificationsByUserId(
    @Args('userId') userId: number,
  ): Promise<Notification[]> {
    const result = await this.fetchNotificationsByUserIdUseCase.execute(userId);
    return result.map(transformNotificationDTOToGraphQL)
  }

  @Query(() => [NotificationDTO])
  async fetchRecentNotifications(
    @Args('userId') userId: number,
  ): Promise<Notification[]> {
    const result = await this.fetchRecentNotificationsUseCase.execute(userId);
    return result.map(transformNotificationDTOToGraphQL)
  }

  @Mutation(() => 'Notification', { nullable: true })
  async markNotificationAsRead(
    @Args('notificationId') notificationId: number,
  ): Promise<Notification | null> {
    const result = await this.markNotificationAsReadUseCase.execute(notificationId);
    return transformNotificationDTOToGraphQL(result)
  }

  @Mutation(() => 'Notification', { nullable: true })
  async updateNotification(
    @Args('notificationId') notificationId: number,
    @Args('updates') updates: NotificationDTO,
  ): Promise<Notification | null> {
    const result = await this.updateNotificationUseCase.execute(notificationId, updates);
    return transformNotificationDTOToGraphQL(result)
  }
}
