import { Injectable } from '@nestjs/common';
import { SubsiteService } from '../../../application/services/subsite.service';

/**
 * Use case class for updating a subsite's configuration.
 * This class interacts with the Subsite service to update the configuration of a subsite.
 */
@Injectable()
export class UpdateSubsiteConfig {
  constructor(private readonly subsiteService: SubsiteService) { }

  /**
   * Execute the update-subsite-config use case.
   * @param id - Unique identifier of the subsite.
   * @param config - New configuration to apply to the subsite.
   * @returns The updated Subsite entity.
   */
  async execute(id: number, config: any): Promise<any> {
    return this.subsiteService.updateSubsiteConfig(id, config);
  }
}
