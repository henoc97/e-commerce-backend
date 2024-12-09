import { Subsite } from '../../../domain/entities/subsite.entity';
import { SubsiteDTO } from '../../../presentation/dtos/subsite.dto';
import { toUserDTO } from './to.user.dto';

/**
 * Converts a Subsite entity to SubsiteDTO.
 * @param Subsite - The Subsite entity to convert.
 * @returns The corresponding SubsiteDTO.
 */
export function toSubsiteDTO(Subsite: any): SubsiteDTO {
  return new SubsiteDTO(
    Subsite.id,
    Subsite.title,
    Subsite.userId,
    Subsite.user ? toUserDTO(Subsite.user) : undefined,
    Subsite.config,
    Subsite.createdAt,
  );
}
