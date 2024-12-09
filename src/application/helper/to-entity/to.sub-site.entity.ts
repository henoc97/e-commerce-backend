import { Subsite } from '../../../domain/entities/subsite.entity';
import { SubsiteDTO } from '../../../presentation/dtos/subsite.dto';
import { fromUserDTO } from './to.user.entity';

/**
 * Converts a SubsiteDTO to a Subsite entity.
 * @param SubsiteDTO - The SubsiteDTO to convert.
 * @returns The corresponding Subsite entity.
 */
export function fromSubsiteDTO(
  SubsiteDTO: SubsiteDTO | Partial<SubsiteDTO>,
): Subsite {
  return new Subsite(
    SubsiteDTO.id,
    SubsiteDTO.title,
    SubsiteDTO.userId,
    SubsiteDTO.user ? fromUserDTO(SubsiteDTO.user) : undefined,
    SubsiteDTO.config,
    SubsiteDTO.createdAt,
  );
}
