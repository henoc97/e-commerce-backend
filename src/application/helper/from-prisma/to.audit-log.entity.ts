import { AuditLog } from '../../../domain/entities/audit-log.entity';
import { fromUserPrisma } from './to.user.entity';

/**
 * Converts an AuditLogPrisma to an AuditLog entity.
 * @param auditLogPrisma - The AuditLogPrisma to convert.
 * @returns The corresponding AuditLog entity.
 */
export function fromAuditLogPrisma(auditLogPrisma: any): AuditLog {
  return new AuditLog(
    auditLogPrisma.id,
    auditLogPrisma.userId,
    auditLogPrisma.action,
    auditLogPrisma.entity,
    auditLogPrisma.entityId,
    auditLogPrisma.changes,
    auditLogPrisma.createdAt,
    auditLogPrisma.user ? fromUserPrisma(auditLogPrisma.user) : undefined,
  );
}
