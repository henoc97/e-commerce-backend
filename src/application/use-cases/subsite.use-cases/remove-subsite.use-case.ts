import { Injectable } from '@nestjs/common';
import { SubsiteService } from 'src/application/services/subsite.service';

/**
 * Use case class for removing a subsite.
 * This class interacts with the Subsite service to remove a subsite by its ID.
 */
@Injectable()
export class RemoveSubsite {
  constructor(private readonly subsiteService: SubsiteService) {}

  /**
   * Execute the remove-subsite use case.
   * @param id - Unique identifier of the subsite to remove.
   * @returns A boolean indicating the success of the removal.
   */
  async execute(id: number): Promise<boolean> {
    return this.subsiteService.removeSubsite(id);
  }
}
