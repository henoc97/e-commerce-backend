import { AuditLogDTO } from '../../../presentation/dtos/audit-log.dto';
import { toUserDTO } from './to.user.dto';

/**
 * Converts an AuditLog entity to an AuditLogDTO.
 * @param auditLog - The AuditLog entity to convert.
 * @returns The corresponding AuditLogDTO.
 */
export function toAuditLogDTO(auditLog: any): AuditLogDTO {
  return new AuditLogDTO(
    auditLog.id,
    auditLog.action,
    auditLog.entity,
    auditLog.entityId,
    auditLog.changes,
    auditLog.createdAt,
    auditLog.userId,
    auditLog.user ? toUserDTO(auditLog.user) : undefined,
  );
}
