import { Subsite } from 'src/domain/entities/Subsite.entity';
import { SubsiteDTO } from 'src/presentation/dtos/Subsite.dto';
import { toUserDTO } from './to.user.dto';

/**
 * Converts a Subsite entity to SubsiteDTO.
 * @param Subsite - The Subsite entity to convert.
 * @returns The corresponding SubsiteDTO.
 */
export function toSubsiteDTO(Subsite: Subsite): SubsiteDTO {
  return new SubsiteDTO(
    Subsite.id,
    Subsite.title,
    Subsite.userId,
    Subsite.user ? toUserDTO(Subsite.user) : undefined,
    Subsite.config,
    Subsite.createdAt,
  );
}
