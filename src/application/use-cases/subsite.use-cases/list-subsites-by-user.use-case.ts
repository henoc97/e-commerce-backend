import { Injectable } from '@nestjs/common';
import { SubsiteService } from '../../../application/services/subsite.service';
import { SubsiteDTO } from '../../../presentation/dtos/subsite.dto';
import { toSubsiteDTO } from '../../../application/helper/to-dto/to.sub-site.dto';

/**
 * Use case class for listing subsites by user.
 * This class interacts with the Subsite service to get all subsites associated with a specific user.
 */
@Injectable()
export class ListSubsitesByUser {
  constructor(private readonly subsiteService: SubsiteService) { }

  /**
   * Execute the list-subsites-by-user use case.
   * @param userId - Unique identifier of the user.
   * @returns An array of Subsite entities associated with the user as DTOs.
   */
  async execute(userId: number): Promise<SubsiteDTO[]> {
    const subsites = await this.subsiteService.getSubsitesByUser(userId);
    return subsites?.map(toSubsiteDTO);
  }
}
