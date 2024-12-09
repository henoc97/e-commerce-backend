import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CountUnreadNotifications } from '../../../application/use-cases/notification.use-cases/count-unread-notifications.use-case';
import { CreateNotification } from '../../../application/use-cases/notification.use-cases/create-notification.use-case';
import { DeleteNotification } from '../../../application/use-cases/notification.use-cases/delete-notification.use-case';
import { FetchNotificationById } from '../../../application/use-cases/notification.use-cases/fetch-notification-by-id.use-case';
import { FetchNotificationsByDateRange } from '../../../application/use-cases/notification.use-cases/fetch-notifications-by-date-range.use-case';
import { FetchNotificationsByType } from '../../../application/use-cases/notification.use-cases/fetch-notifications-by-type.use-case';
import { FetchNotificationsByUserId } from '../../../application/use-cases/notification.use-cases/fetch-notifications-by-user-id.use-case';
import { FetchRecentNotifications } from '../../../application/use-cases/notification.use-cases/fetch-recent-notifications.use-case';
import { MarkNotificationAsRead } from '../../../application/use-cases/notification.use-cases/mark-notification-as-read.use-case';
import { UpdateNotification } from '../../../application/use-cases/notification.use-cases/update-notification.use-case';
import { NotificationDTO } from '../../../presentation/dtos/notification.dto';
import { NotificationType } from '../../../domain/enums/notification-type.enum';
import { transformNotificationDTOToGraphQL } from '../../../application/helper/utils/transformers';
import { NotificationInput } from '../../../presentation/input/notification.input';
import { NotificationOutput } from '../../../presentation/output/notification.output';

@Resolver(() => NotificationOutput)
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

  @Mutation(() => NotificationOutput)
  async createNotification(
    @Args('NotificationInput') notificationDTO: NotificationInput,
  ): Promise<NotificationOutput | null> {
    const result = await this.createNotificationUseCase.execute(notificationDTO);
    return transformNotificationDTOToGraphQL(result)
  }

  @Mutation(() => Boolean)
  async deleteNotification(
    @Args('notificationId') notificationId: number,
  ): Promise<boolean> {
    return this.deleteNotificationUseCase.execute(notificationId);
  }

  @Query(() => NotificationOutput, { nullable: true })
  async fetchNotificationById(
    @Args('notificationId') notificationId: number,
  ): Promise<NotificationOutput | null> {
    const result = await this.fetchNotificationByIdUseCase.execute(notificationId);
    return transformNotificationDTOToGraphQL(result)
  }

  @Query(() => [NotificationOutput])
  async fetchNotificationsByDateRange(
    @Args('startDate') startDate: Date,
    @Args('endDate') endDate: Date,
  ): Promise<NotificationOutput[]> {
    const result = await this.fetchNotificationsByDateRangeUseCase.execute(
      startDate,
      endDate,
    );
    return result?.map(transformNotificationDTOToGraphQL)
  }

  @Query(() => [NotificationOutput])
  async fetchNotificationsByType(
    @Args('type') type: string,
  ): Promise<NotificationOutput[]> {
    const _type = type as unknown as NotificationType
    const result = await this.fetchNotificationsByTypeUseCase.execute(_type);
    return result?.map(transformNotificationDTOToGraphQL)
  }

  @Query(() => [NotificationOutput])
  async fetchNotificationsByUserId(
    @Args('userId') userId: number,
  ): Promise<NotificationOutput[]> {
    const result = await this.fetchNotificationsByUserIdUseCase.execute(userId);
    return result?.map(transformNotificationDTOToGraphQL)
  }

  @Query(() => [NotificationOutput])
  async fetchRecentNotifications(
    @Args('userId') userId: number,
  ): Promise<NotificationOutput[]> {
    const result = await this.fetchRecentNotificationsUseCase.execute(userId);
    return result?.map(transformNotificationDTOToGraphQL)
  }

  @Mutation(() => NotificationOutput, { nullable: true })
  async markNotificationAsRead(
    @Args('notificationId') notificationId: number,
  ): Promise<NotificationOutput | null> {
    const result = await this.markNotificationAsReadUseCase.execute(notificationId);
    return transformNotificationDTOToGraphQL(result)
  }

  @Mutation(() => NotificationOutput, { nullable: true })
  async updateNotification(
    @Args('notificationId') notificationId: number,
    @Args('updates') updates: NotificationInput,
  ): Promise<NotificationOutput | null> {
    const result = await this.updateNotificationUseCase.execute(notificationId, updates);
    return transformNotificationDTOToGraphQL(result)
  }
}
