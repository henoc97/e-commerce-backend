import { Injectable } from '@nestjs/common';
import { UserActivityService } from 'src/application/services/user-activity.service';
import { UserActivityDTO } from 'src/presentation/dtos/user-activity.dto';
import { toUserActivityDTO } from 'src/application/helper/to-dto/to.user-activity.dto';

/**
 * Use case class for listing activities by user.
 * This class interacts with the UserActivity service to list activities for a specific user.
 */
@Injectable()
export class ListActivitiesByUser {
  constructor(private readonly activityService: UserActivityService) { }

  /**
   * Execute the list-activities-by-user use case.
   * @param userId - The ID of the user to list activities for.
   * @returns An array of UserActivityDTOs associated with the user.
   */
  async execute(userId: number): Promise<UserActivityDTO[]> {
    const activities = await this.activityService.listActivitiesByUser(userId);

    return activities?.map(toUserActivityDTO);
  }
}
