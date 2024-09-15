import { Injectable } from '@nestjs/common';
import { UserActivityService } from 'src/application/services/user-activity.service';
import { UserActivityDTO } from 'src/presentation/dtos/user-activity.dto';
import { toUserActivityDTO } from 'src/application/helper/to-dto/to.user-activity.dto';

/**
 * Use case class for updating an activity.
 * This class interacts with the UserActivity service to update an existing activity record.
 */
@Injectable()
export class UpdateActivity {
  constructor(private readonly activityService: UserActivityService) {}

  /**
   * Execute the update-activity use case.
   * @param id - Unique identifier of the activity to update.
   * @param updates - Partial fields to update.
   * @returns The updated activity as UserActivityDTO.
   */
  async execute(
    id: number,
    updates: Partial<UserActivityDTO>,
  ): Promise<UserActivityDTO | null> {
    const updatedActivity = await this.activityService.updateActivity(
      id,
      updates,
    );

    if (!updatedActivity) return null;

    return toUserActivityDTO(updatedActivity);
  }
}
