import { Injectable } from '@nestjs/common';
import { UserActivityService } from '../../../application/services/user-activity.service';

/**
 * Use case class for deleting an activity.
 * This class interacts with the UserActivity service to delete an activity by its ID.
 */
@Injectable()
export class DeleteActivity {
  constructor(private readonly activityService: UserActivityService) { }

  /**
   * Execute the delete-activity use case.
   * @param id - Unique identifier of the activity to delete.
   * @returns True if the deletion was successful, otherwise false.
   */
  async execute(id: number): Promise<boolean> {
    return await this.activityService.deleteActivity(id);
  }
}
