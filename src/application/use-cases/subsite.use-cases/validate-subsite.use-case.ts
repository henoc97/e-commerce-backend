import { Injectable } from '@nestjs/common';
import { SubsiteService } from 'src/application/services/subsite.service';
import { SubsiteDTO } from 'src/presentation/dtos/subsite.dto';

/**
 * Use case class for validating a subsite.
 * This class interacts with the Subsite service to validate a subsite's attributes.
 */
@Injectable()
export class ValidateSubsite {
  constructor(private readonly subsiteService: SubsiteService) {}

  /**
   * Execute the validate-subsite use case.
   * @param subsiteDTO - Data Transfer Object representing the subsite to validate.
   * @returns A boolean indicating if the Subsite is valid.
   */
  async execute(subsiteDTO: SubsiteDTO): Promise<boolean> {
    return this.subsiteService.validateSubsite(subsiteDTO);
  }
}
