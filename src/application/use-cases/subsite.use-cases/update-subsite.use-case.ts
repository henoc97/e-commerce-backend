import { Injectable } from '@nestjs/common';
import { SubsiteService } from '../../../application/services/subsite.service';
import { SubsiteDTO } from '../../../presentation/dtos/subsite.dto';
import { toSubsiteDTO } from '../../../application/helper/to-dto/to.sub-site.dto';

/**
 * Use case class for updating a subsite.
 * This class interacts with the Subsite service to update a subsite's details.
 */
@Injectable()
export class UpdateSubsite {
  constructor(private readonly subsiteService: SubsiteService) { }

  /**
   * Execute the update-subsite use case.
   * @param id - Unique identifier of the subsite to update.
   * @param updates - Partial fields to update for the subsite.
   * @returns The updated Subsite entity as DTO.
   */
  async execute(id: number, updates: Partial<SubsiteDTO>): Promise<SubsiteDTO> {
    const subsite = await this.subsiteService.updateSubsite(id, updates);
    return toSubsiteDTO(subsite);
  }
}
