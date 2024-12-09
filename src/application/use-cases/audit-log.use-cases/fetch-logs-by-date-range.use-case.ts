import { Injectable } from '@nestjs/common';
import { toAuditLogDTO } from '../../../application/helper/to-dto/to.audit-log.dto';
import { AuditLogService } from '../../../application/services/audit-log.service';
import { AuditLogDTO } from '../../../presentation/dtos/audit-log.dto';

/**
 * Use case class for fetching audit logs within a specified date range.
 */
@Injectable()
export class FetchLogsByDateRange {
  constructor(private readonly auditLogService: AuditLogService) { }

  /**
   * Executes the fetch-logs-by-date-range use case.
   * @param startDate - The start of the date range.
   * @param endDate - The end of the date range.
   * @returns A promise that resolves to an array of audit logs within the specified range.
   */
  async execute(startDate: Date, endDate: Date): Promise<AuditLogDTO[]> {
    const logs = await this.auditLogService.getLogsByDateRange(
      startDate,
      endDate,
    );
    return logs?.map((log) => toAuditLogDTO(log));
  }
}
