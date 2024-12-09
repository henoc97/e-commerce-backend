import { Injectable } from '@nestjs/common';
import { SubsiteService } from '../../../application/services/subsite.service';

/**
 * Use case class for fetching subsite configuration.
 * This class interacts with the Subsite service to get the configuration of a subsite.
 */
@Injectable()
export class FetchSubsiteConfig {
  constructor(private readonly subsiteService: SubsiteService) { }

  /**
   * Execute the fetch-subsite-config use case.
   * @param id - Unique identifier of the subsite.
   * @returns The configuration of the subsite.
   */
  async execute(id: number): Promise<any> {
    return this.subsiteService.getSubsiteConfig(id);
  }
}
