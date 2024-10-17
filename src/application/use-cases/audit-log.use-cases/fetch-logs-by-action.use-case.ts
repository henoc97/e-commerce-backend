import { Injectable } from '@nestjs/common';
import { toAuditLogDTO } from 'src/application/helper/to-dto/to.audit-log.dto';
import { AuditLogService } from 'src/application/services/audit-log.service';
import { AuditLogAction } from 'src/domain/enums/audit-log-action.enum';
import { AuditLogDTO } from 'src/presentation/dtos/audit-log.dto';

/**
 * Use case class for fetching audit logs by action type.
 */
@Injectable()
export class FetchLogsByAction {
  constructor(private readonly auditLogService: AuditLogService) {}

  /**
   * Executes the fetch-logs-by-action use case.
   * @param action - The action type to filter logs by.
   * @returns A promise that resolves to an array of audit logs matching the specified action type.
   */
  async execute(action: AuditLogAction): Promise<AuditLogDTO[]> {
    const logs = await this.auditLogService.getLogsByAction(action);
    return logs.map((log) => toAuditLogDTO(log));
  }
}
