import { Injectable } from '@nestjs/common';
import { UserActivityService } from 'src/application/services/user-activity.service';

/**
 * Use case class for counting activities by user.
 * This class interacts with the UserActivity service to get the count of activities for a specific user.
 */
@Injectable()
export class CountActivitiesByUser {
  constructor(private readonly activityService: UserActivityService) {}

  /**
   * Execute the count-activities-by-user use case.
   * @param userId - The ID of the user to count activities for.
   * @returns The count of activities associated with the user.
   */
  async execute(userId: number): Promise<number> {
    return await this.activityService.countActivitiesByUser(userId);
  }
}
