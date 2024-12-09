import { Injectable } from '@nestjs/common';
import { toAuditLogDTO } from '../../../application/helper/to-dto/to.audit-log.dto';
import { AuditLogService } from '../../../application/services/audit-log.service';
import { AuditLogDTO } from '../../../presentation/dtos/audit-log.dto';

/**
 * Use case class for fetching audit logs for a specific entity.
 */
@Injectable()
export class FetchLogsByEntity {
  constructor(private readonly auditLogService: AuditLogService) { }

  /**
   * Executes the fetch-logs-by-entity use case.
   * @param entity - The type of entity.
   * @param entityId - The unique ID of the entity.
   * @returns A promise that resolves to an array of audit logs for the specified entity.
   */
  async execute(entity: string, entityId: number): Promise<AuditLogDTO[]> {
    const logs = await this.auditLogService.getLogsByEntity(entity, entityId);
    return logs?.map((log) => toAuditLogDTO(log));
  }
}
