import { Injectable } from '@nestjs/common';
import { SubsiteService } from 'src/application/services/subsite.service';
import { SubsiteDTO } from 'src/presentation/dtos/subsite.dto';
import { toSubsiteDTO } from 'src/application/helper/to-dto/to.sub-site.dto';

/**
 * Use case class for fetching a subsite by its ID.
 * This class interacts with the Subsite service to get a specific subsite.
 */
@Injectable()
export class FetchSubsiteById {
  constructor(private readonly subsiteService: SubsiteService) {}

  /**
   * Execute the fetch-subsite-by-id use case.
   * @param id - Unique identifier of the subsite.
   * @returns The Subsite entity as DTO if found.
   */
  async execute(id: number): Promise<SubsiteDTO | null> {
    const subsite = await this.subsiteService.getSubsiteById(id);
    return subsite ? toSubsiteDTO(subsite) : null;
  }
}
