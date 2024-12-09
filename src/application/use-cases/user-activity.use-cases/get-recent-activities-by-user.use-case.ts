import { Injectable } from '@nestjs/common';
import { UserActivityService } from '../../../application/services/user-activity.service';
import { UserActivityDTO } from '../../../presentation/dtos/user-activity.dto';
import { toUserActivityDTO } from '../../../application/helper/to-dto/to.user-activity.dto';

/**
 * Use case class for getting recent activities by user.
 * This class interacts with the UserActivity service to get recent activities of a user.
 */
@Injectable()
export class GetRecentActivitiesByUser {
  constructor(private readonly activityService: UserActivityService) { }

  /**
   * Execute the get-recent-activities-by-user use case.
   * @param userId - Unique identifier of the user to retrieve recent activities for.
   * @param limit - The maximum number of recent activities to retrieve.
   * @returns An array of recent UserActivityDTOs.
   */
  async execute(userId: number, limit: number): Promise<UserActivityDTO[]> {
    const activities = await this.activityService.getRecentActivitiesByUser(
      userId,
      limit,
    );

    return activities?.map(toUserActivityDTO);
  }
}
