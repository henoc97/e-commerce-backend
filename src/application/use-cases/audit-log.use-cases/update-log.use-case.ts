import { Injectable } from '@nestjs/common';
import { toAuditLogDTO } from 'src/application/helper/to-dto/to.audit-log.dto';
import { AuditLogService } from 'src/application/services/audit-log.service';
import { AuditLogDTO } from 'src/presentation/dtos/audit-log.dto';

/**
 * Use case class for updating an existing audit log entry.
 */
@Injectable()
export class UpdateLog {
  constructor(private readonly auditLogService: AuditLogService) {}

  /**
   * Executes the update-log use case.
   * @param id - The unique ID of the audit log entry to update.
   * @param dto - Data Transfer Object containing the updated details.
   * @returns A promise that resolves to the updated audit log entry.
   */
  async execute(id: number, dto: AuditLogDTO): Promise<AuditLogDTO> {
    const auditLog = await this.auditLogService.updateLog(id, dto);
    return toAuditLogDTO(auditLog);
  }
}
