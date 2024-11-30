import { Injectable } from '@nestjs/common';
import { toNotificationDTO } from 'src/application/helper/to-dto/to.notification.dto';
import { NotificationService } from 'src/application/services/notification.service';
import { NotificationDTO } from 'src/presentation/dtos/notification.dto';

/**
 * Use case for fetching notifications within a date range.
 */
@Injectable()
export class FetchNotificationsByDateRange {
  constructor(private readonly service: NotificationService) { }

  /**
   * Executes the use case.
   * @param startDate - The start date.
   * @param endDate - The end date.
   * @returns The notifications within the date range.
   */
  async execute(startDate: Date, endDate: Date): Promise<NotificationDTO[]> {
    const notifications = await this.service.getNotificationsByDateRange(
      startDate,
      endDate,
    );
    return notifications?.map(toNotificationDTO);
  }
}
