import { Inject, Injectable } from '@nestjs/common';
import { AuditLog } from 'src/domain/entities/audit-log.entity';
import { IAuditLogRepository } from 'src/domain/repositories/auditlog.repository';
import { AuditLogDTO } from 'src/presentation/dtos/audit-log.dto';
import { fromAuditLogDTO } from '../helper/to-entity/to.audit-log.entity';
import { AuditLogAction } from 'src/domain/enums/audit-log-action.enum';

/**
 * Service for managing audit logs.
 * Implements business logic for interacting with audit log data.
 */
@Injectable()
export class AuditLogService {
  constructor(
    @Inject('IAuditLogRepository')
    private readonly auditLogRepository: IAuditLogRepository,
  ) {}

  /**
   * Creates a new audit log entry.
   * @param dto - Data Transfer Object containing the details of the log to be created.
   * @returns A promise that resolves to the created audit log entry.
   */
  async createLog(dto: AuditLogDTO): Promise<AuditLog> {
    const auditLog = fromAuditLogDTO(dto);
    return this.auditLogRepository.create(auditLog);
  }

  /**
   * Retrieves an audit log entry by its ID.
   * @param id - The unique ID of the audit log entry.
   * @returns A promise that resolves to the audit log entry if found, otherwise null.
   */
  async getLogById(id: number): Promise<AuditLog | null> {
    return this.auditLogRepository.getById(id);
  }

  /**
   * Retrieves all audit logs for a specific entity.
   * @param entity - The type of entity.
   * @param entityId - The unique ID of the entity.
   * @returns A promise that resolves to an array of audit logs for the specified entity.
   */
  async getLogsByEntity(entity: string, entityId: number): Promise<AuditLog[]> {
    return this.auditLogRepository.getByEntity(entity, entityId);
  }

  /**
   * Retrieves all audit logs created by a specific user.
   * @param userId - The unique ID of the user.
   * @returns A promise that resolves to an array of audit logs created by the specified user.
   */
  async getLogsByUser(userId: number): Promise<AuditLog[]> {
    return this.auditLogRepository.getByUser(userId);
  }

  /**
   * Updates an existing audit log entry.
   * @param id - The unique ID of the audit log entry to update.
   * @param dto - Data Transfer Object containing the updated details.
   * @returns A promise that resolves to the updated audit log entry.
   */
  async updateLog(id: number, dto: AuditLogDTO): Promise<AuditLog> {
    const updatedLog = fromAuditLogDTO(dto);
    return this.auditLogRepository.update(id, updatedLog);
  }

  /**
   * Deletes an audit log entry by its ID.
   * @param id - The unique ID of the audit log entry to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  async deleteLog(id: number): Promise<boolean> {
    return this.auditLogRepository.delete(id);
  }

  /**
   * Retrieves audit logs within a specified date range.
   * @param startDate - The start of the date range.
   * @param endDate - The end of the date range.
   * @returns A promise that resolves to an array of audit logs within the specified range.
   */
  async getLogsByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<AuditLog[]> {
    return this.auditLogRepository.getByDateRange(startDate, endDate);
  }

  /**
   * Retrieves the most recent audit logs.
   * @param limit - The maximum number of logs to retrieve.
   * @returns A promise that resolves to an array of the most recent audit logs.
   */
  async getRecentLogs(limit: number): Promise<AuditLog[]> {
    return this.auditLogRepository.getRecent(limit);
  }

  /**
   * Retrieves all audit logs related to a specific action type.
   * @param action - The action type to filter logs by.
   * @returns A promise that resolves to an array of audit logs matching the specified action type.
   */
  async getLogsByAction(action: AuditLogAction): Promise<AuditLog[]> {
    return this.auditLogRepository.getByAction(action);
  }
}
