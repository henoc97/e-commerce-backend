import { Injectable } from '@nestjs/common';
import { UserActivityService } from '../../../application/services/user-activity.service';
import { UserActivityDTO } from '../../../presentation/dtos/user-activity.dto';
import { toUserActivityDTO } from '../../../application/helper/to-dto/to.user-activity.dto';

/**
 * Use case class for listing activities by date range.
 * This class interacts with the UserActivity service to list activities within a specified time range.
 */
@Injectable()
export class ListActivitiesByDateRange {
  constructor(private readonly activityService: UserActivityService) { }

  /**
   * Execute the list-activities-by-date-range use case.
   * @param start - The start date and time of the range.
   * @param end - The end date and time of the range.
   * @returns An array of UserActivityDTOs within the specified date range.
   */
  async execute(start: Date, end: Date): Promise<UserActivityDTO[]> {
    const activities = await this.activityService.listActivitiesByDateRange(
      start,
      end,
    );

    return activities?.map(toUserActivityDTO);
  }
}
