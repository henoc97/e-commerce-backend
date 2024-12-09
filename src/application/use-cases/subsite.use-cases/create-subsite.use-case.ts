import { Injectable } from '@nestjs/common';
import { toSubsiteDTO } from '../../../application/helper/to-dto/to.sub-site.dto';
import { SubsiteService } from '../../../application/services/subsite.service';
import { SubsiteDTO } from '../../../presentation/dtos/subsite.dto';

/**
 * Use case class for creating a Subsite.
 * This class interacts with the Subsite service to create a new Subsite.
 */
@Injectable()
export class CreateSubsite {
  constructor(private readonly subsiteService: SubsiteService) { }

  /**
   * Execute the create-Subsite use case.
   * @param subsiteDTO - The SubsiteDTO containing the Subsite data to be created.
   * @returns The created Subsite entity as DTO.
   */
  async execute(subsiteDTO: SubsiteDTO): Promise<SubsiteDTO | null> {
    const Subsite = await this.subsiteService.createSubsite(subsiteDTO);
    return Subsite ? toSubsiteDTO(Subsite) : null;
  }
}
