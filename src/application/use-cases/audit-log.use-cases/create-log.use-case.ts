import { Injectable } from '@nestjs/common';
import { toAuditLogDTO } from 'src/application/helper/to-dto/to.audit-log.dto';
import { AuditLogService } from 'src/application/services/audit-log.service';
import { AuditLogDTO } from 'src/presentation/dtos/audit-log.dto';

/**
 * Use case class for creating an audit log entry.
 */
@Injectable()
export class CreateLog {
  constructor(private readonly auditLogService: AuditLogService) {}

  /**
   * Executes the create-log use case.
   * @param dto - Data Transfer Object containing the details of the log to be created.
   * @returns A promise that resolves to the created audit log entry.
   */
  async execute(dto: AuditLogDTO): Promise<AuditLogDTO> {
    const auditLog = await this.auditLogService.createLog(dto);
    return toAuditLogDTO(auditLog);
  }
}
