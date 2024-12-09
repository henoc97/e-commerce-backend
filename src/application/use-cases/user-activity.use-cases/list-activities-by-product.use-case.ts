import { Injectable } from '@nestjs/common';
import { UserActivityService } from '../../../application/services/user-activity.service';
import { UserActivityDTO } from '../../../presentation/dtos/user-activity.dto';
import { toUserActivityDTO } from '../../../application/helper/to-dto/to.user-activity.dto';

/**
 * Use case class for listing activities by product.
 * This class interacts with the UserActivity service to list activities related to a specific product.
 */
@Injectable()
export class ListActivitiesByProduct {
  constructor(private readonly activityService: UserActivityService) { }

  /**
   * Execute the list-activities-by-product use case.
   * @param productId - The ID of the product to list activities for.
   * @returns An array of UserActivityDTOs related to the product.
   */
  async execute(productId: number): Promise<UserActivityDTO[]> {
    const activities =
      await this.activityService.listActivitiesByProduct(productId);

    return activities?.map(toUserActivityDTO);
  }
}
