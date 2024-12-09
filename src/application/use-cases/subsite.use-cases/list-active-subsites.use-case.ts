import { Injectable } from '@nestjs/common';
import { SubsiteService } from '../../../application/services/subsite.service';
import { SubsiteDTO } from '../../../presentation/dtos/subsite.dto';
import { toSubsiteDTO } from '../../../application/helper/to-dto/to.sub-site.dto';

/**
 * Use case class for listing active subsites.
 * This class interacts with the Subsite service to get all currently active subsites.
 */
@Injectable()
export class ListActiveSubsites {
  constructor(private readonly subsiteService: SubsiteService) { }

  /**
   * Execute the list-active-subsites use case.
   * @returns An array of active Subsite entities as DTOs.
   */
  async execute(): Promise<SubsiteDTO[]> {
    const subsites = await this.subsiteService.getActiveSubsites();
    return subsites?.map(toSubsiteDTO);
  }
}
