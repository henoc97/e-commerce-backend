import { Subsite } from 'src/domain/entities/Subsite.entity';
import { SubsiteDTO } from 'src/presentation/dtos/Subsite.dto';
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
