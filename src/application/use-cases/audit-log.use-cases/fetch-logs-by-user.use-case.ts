import { Injectable } from '@nestjs/common';
import { toAuditLogDTO } from 'src/application/helper/to-dto/to.audit-log.dto';
import { AuditLogService } from 'src/application/services/audit-log.service';
import { AuditLogDTO } from 'src/presentation/dtos/audit-log.dto';

/**
 * Use case class for fetching audit logs created by a specific user.
 */
@Injectable()
export class FetchLogsByUser {
  constructor(private readonly auditLogService: AuditLogService) { }

  /**
   * Executes the fetch-logs-by-user use case.
   * @param userId - The unique ID of the user.
   * @returns A promise that resolves to an array of audit logs created by the specified user.
   */
  async execute(userId: number): Promise<AuditLogDTO[]> {
    const logs = await this.auditLogService.getLogsByUser(userId);
    return logs?.map((log) => toAuditLogDTO(log));
  }
}
