import { Injectable } from '@nestjs/common';
import { UserActivityService } from '../../../application/services/user-activity.service';
import { UserActivityDTO } from '../../../presentation/dtos/user-activity.dto';
import { toUserActivityDTO } from '../../../application/helper/to-dto/to.user-activity.dto';

/**
 * Use case class for recording a new activity.
 * This class interacts with the UserActivity service to create a new activity record.
 */
@Injectable()
export class RecordActivity {
  constructor(private readonly activityService: UserActivityService) { }

  /**
   * Execute the record-activity use case.
   * @param activityDTO - Data Transfer Object containing the activity details to be recorded.
   * @returns The recorded activity as UserActivityDTO.
   */
  async execute(activityDTO: UserActivityDTO): Promise<UserActivityDTO> {
    const activity = await this.activityService.recordActivity(activityDTO);

    return toUserActivityDTO(activity);
  }
}
