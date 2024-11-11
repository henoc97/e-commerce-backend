import { Subsite } from 'src/domain/entities/subsite.entity';
import { fromUserPrisma } from './to.user.entity';

/**
 * Converts a SubsitePrisma to a Subsite entity.
 * @param SubsitePrisma - The SubsitePrisma to convert.
 * @returns The corresponding Subsite entity.
 */
export function fromSubsitePrisma(SubsitePrisma: any): Subsite {
  return new Subsite(
    SubsitePrisma.id,
    SubsitePrisma.title,
    SubsitePrisma.userId,
    SubsitePrisma.user ? fromUserPrisma(SubsitePrisma.user) : undefined,
    SubsitePrisma.config,
    SubsitePrisma.createdAt,
  );
}
