import { AuditLog } from 'src/domain/entities/audit-log.entity';
import { AuditLogDTO } from 'src/presentation/dtos/audit-log.dto';
import { fromUserDTO } from './to.user.entity';

/**
 * Converts an AuditLogDTO to an AuditLog entity.
 * @param auditLogDTO - The AuditLogDTO to convert.
 * @returns The corresponding AuditLog entity.
 */
export function fromAuditLogDTO(
  auditLogDTO: AuditLogDTO | Partial<AuditLogDTO>,
): AuditLog {
  return new AuditLog(
    auditLogDTO.id,
    auditLogDTO.userId,
    auditLogDTO.action,
    auditLogDTO.entity,
    auditLogDTO.entityId,
    auditLogDTO.changes,
    auditLogDTO.createdAt,
    auditLogDTO.user ? fromUserDTO(auditLogDTO.user) : undefined,
  );
}
