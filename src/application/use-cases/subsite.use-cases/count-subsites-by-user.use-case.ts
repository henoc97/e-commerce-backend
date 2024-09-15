import { Injectable } from '@nestjs/common';
import { SubsiteService } from 'src/application/services/Subsite.service';

/**
 * Use case class for counting Subsites by user.
 * This class interacts with the Subsite service to perform operations on Subsites.
 */
@Injectable()
export class CountSubsitesByUser {
  constructor(private readonly SubsiteService: SubsiteService) {}

  /**
   * Execute the count-Subsites-by-user use case.
   * @param userId - Unique identifier of the user.
   * @returns The count of Subsites for the user.
   */
  async execute(userId: number): Promise<number> {
    return this.SubsiteService.countSubsitesByUser(userId);
  }
}
