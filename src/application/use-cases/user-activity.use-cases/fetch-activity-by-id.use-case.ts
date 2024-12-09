import { Injectable } from '@nestjs/common';
import { UserActivityService } from '../../../application/services/user-activity.service';
import { UserActivityDTO } from '../../../presentation/dtos/user-activity.dto';
import { toUserActivityDTO } from '../../../application/helper/to-dto/to.user-activity.dto';

/**
 * Use case class for fetching an activity by ID.
 * This class interacts with the UserActivity service to get details of a specific activity.
 */
@Injectable()
export class FetchActivityById {
  constructor(private readonly activityService: UserActivityService) { }

  /**
   * Execute the fetch-activity-by-id use case.
   * @param id - Unique identifier of the activity to retrieve.
   * @returns The activity details as UserActivityDTO if found, otherwise null.
   */
  async execute(id: number): Promise<UserActivityDTO | null> {
    const activity = await this.activityService.getActivityById(id);

    if (!activity) return null;

    return toUserActivityDTO(activity);
  }
}
