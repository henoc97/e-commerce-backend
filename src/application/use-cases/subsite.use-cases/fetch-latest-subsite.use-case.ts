import { Injectable } from '@nestjs/common';
import { SubsiteService } from '../../../application/services/subsite.service';
import { toSubsiteDTO } from '../../../application/helper/to-dto/to.sub-site.dto';
import { SubsiteDTO } from '../../../presentation/dtos/subsite.dto';

/**
 * Use case class for fetching the latest subsite.
 * This class interacts with the Subsite service to get the most recently created subsite.
 */
@Injectable()
export class FetchLatestSubsite {
  constructor(private readonly subsiteService: SubsiteService) { }

  /**
   * Execute the fetch-latest-subsite use case.
   * @returns The most recent Subsite entity as DTO.
   */
  async execute(): Promise<SubsiteDTO | null> {
    const subsite = await this.subsiteService.getLatestSubsite();
    return subsite ? toSubsiteDTO(subsite) : null;
  }
}
