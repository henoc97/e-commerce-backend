import { AuditLog } from '../entities/audit-log.entity';
import { AuditLogAction } from '../enums/audit-log-action.enum';

/**
 * Interface defining operations for managing audit logs.
 */
export interface IAuditLogRepository {
  /**
   * Records a new audit log entry.
   * @param log - The audit log entry to be recorded.
   * @returns A promise that resolves to the created audit log entry.
   */
  create(log: AuditLog): Promise<AuditLog>;

  /**
   * Retrieves an audit log entry by its ID.
   * @param id - The unique ID of the audit log entry.
   * @returns A promise that resolves to the audit log entry if found, otherwise null.
   */
  getById(id: number): Promise<AuditLog | null>;

  /**
   * Retrieves all audit logs for a specific entity.
   * @param entity - The type of entity.
   * @param entityId - The unique ID of the entity.
   * @returns A promise that resolves to an array of audit logs for the specified entity.
   */
  getByEntity(entity: string, entityId: number): Promise<AuditLog[]>;

  /**
   * Retrieves all audit logs created by a specific user.
   * @param userId - The unique ID of the user.
   * @returns A promise that resolves to an array of audit logs created by the specified user.
   */
  getByUser(userId: number): Promise<AuditLog[]>;

  /**
   * Updates an existing audit log entry.
   * @param id - The unique ID of the audit log entry to update.
   * @param updatedLog - The updated audit log entry.
   * @returns A promise that resolves to the updated audit log entry.
   */
  update(id: number, updatedLog: AuditLog): Promise<AuditLog>;

  /**
   * Deletes an audit log entry by its ID.
   * @param id - The unique ID of the audit log entry to delete.
   * @returns A promise that resolves to true if deletion was successful, otherwise false.
   */
  delete(id: number): Promise<boolean>;

  /**
   * Retrieves audit logs within a specified date range.
   * @param startDate - The start of the date range.
   * @param endDate - The end of the date range.
   * @returns A promise that resolves to an array of audit logs within the specified range.
   */
  getByDateRange(startDate: Date, endDate: Date): Promise<AuditLog[]>;

  /**
   * Retrieves the most recent audit logs.
   * @param limit - The maximum number of logs to retrieve.
   * @returns A promise that resolves to an array of the most recent audit logs.
   */
  getRecent(limit: number): Promise<AuditLog[]>;

  /**
   * Retrieves all audit logs related to a specific action type.
   * @param action - The action type to filter logs by.
   * @returns A promise that resolves to an array of audit logs matching the specified action type.
   */
  getByAction(action: AuditLogAction): Promise<AuditLog[]>;
}
