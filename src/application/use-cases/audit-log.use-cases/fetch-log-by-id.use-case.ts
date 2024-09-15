import { Injectable } from '@nestjs/common';
import { toAuditLogDTO } from 'src/application/helper/to-dto/to.audit-log.dto';
import { AuditLogService } from 'src/application/services/audit-log.service';
import { AuditLogDTO } from 'src/presentation/dtos/audit-log.dto';

/**
 * Use case class for fetching an audit log entry by its ID.
 */
@Injectable()
export class FetchLogById {
  constructor(private readonly auditLogService: AuditLogService) {}

  /**
   * Executes the fetch-log-by-id use case.
   * @param id - The unique ID of the audit log entry.
   * @returns A promise that resolves to the audit log entry if found, otherwise null.
   */
  async execute(id: number): Promise<AuditLogDTO | null> {
    const auditLog = await this.auditLogService.getLogById(id);
    if (!auditLog) return null;
    return toAuditLogDTO(auditLog);
  }
}
