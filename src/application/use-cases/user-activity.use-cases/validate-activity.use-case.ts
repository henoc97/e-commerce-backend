import { Injectable } from '@nestjs/common';
import { UserActivityService } from 'src/application/services/user-activity.service';
import { UserActivityDTO } from 'src/presentation/dtos/user-activity.dto';

/**
 * Use case class for validating an activity.
 * This class interacts with the UserActivity service to validate the activity data.
 */
@Injectable()
export class ValidateActivity {
  constructor(private readonly activityService: UserActivityService) {}

  /**
   * Execute the validate-activity use case.
   * @param activityDTO - Data Transfer Object containing the activity details to validate.
   * @returns True if the activity data is valid, otherwise false.
   */
  async execute(activityDTO: UserActivityDTO): Promise<boolean> {
    return await this.activityService.validateActivity(activityDTO);
  }
}
