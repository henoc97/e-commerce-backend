import { Injectable } from '@nestjs/common';
import { toAuditLogDTO } from '../../../application/helper/to-dto/to.audit-log.dto';
import { AuditLogService } from '../../../application/services/audit-log.service';
import { AuditLogDTO } from '../../../presentation/dtos/audit-log.dto';

/**
 * Use case class for fetching the most recent audit logs.
 */
@Injectable()
export class FetchRecentLogs {
  constructor(private readonly auditLogService: AuditLogService) { }

  /**
   * Executes the fetch-recent-logs use case.
   * @param limit - The maximum number of logs to retrieve.
   * @returns A promise that resolves to an array of the most recent audit logs.
   */
  async execute(limit: number): Promise<AuditLogDTO[]> {
    const logs = await this.auditLogService.getRecentLogs(limit);
    return logs?.map((log) => toAuditLogDTO(log));
  }
}
