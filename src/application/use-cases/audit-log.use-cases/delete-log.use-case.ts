import { Injectable } from '@nestjs/common';
import { AuditLogService } from '../../../application/services/audit-log.service';

/**
 * Use case class for deleting an audit log entry.
 */
@Injectable()
export class DeleteLog {
  constructor(private readonly auditLogService: AuditLogService) { }

  /**
   * Executes the delete-log use case.
   * @param id - The unique ID of the audit log entry to delete.
   * @returns A promise that resolves to true if the deletion was successful, otherwise false.
   */
  async execute(id: number): Promise<boolean> {
    return this.auditLogService.deleteLog(id);
  }
}
