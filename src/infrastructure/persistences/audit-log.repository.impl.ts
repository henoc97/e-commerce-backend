import { fromAuditLogPrisma } from 'src/application/helper/from-prisma/to.audit-log.entity';
import { AuditLog } from 'src/domain/entities/audit-log.entity';
import { AuditLogAction } from 'src/domain/enums/audit-log-action.enum';
import { IAuditLogRepository } from 'src/domain/repositories/auditlog.repository';
import prisma from 'prisma/prisma.service';

export class AuditLogRepository implements IAuditLogRepository {


  /**
   * Creates a new audit log in the database.
   * @param log The audit log to create.
   * @returns The created audit log.
   */
  async create(log: AuditLog): Promise<AuditLog> {
    try {
      const { id, user, ...audiLog } = log;
      const result = await prisma.auditLog.create({
        data: audiLog,
      });
      return fromAuditLogPrisma(result);
    } catch (error) {
      console.error('Error creating audit log:', error);
      throw error;
    }
  }

  /**
   * Retrieves an audit log by its ID.
   * @param id The ID of the audit log.
   * @returns The audit log or null if not found.
   */
  async getById(id: number): Promise<AuditLog | null> {
    try {
      const result = await prisma.auditLog.findUnique({
        where: { id },
      });
      return fromAuditLogPrisma(result);
    } catch (error) {
      console.error('Error retrieving audit log by ID:', error);
      throw error;
    }
  }

  /**
   * Retrieves all audit logs related to a specific entity and entityId.
   * @param entity The name of the entity.
   * @param entityId The ID of the entity.
   * @returns A list of audit logs for the given entity.
   */
  async getByEntity(entity: string, entityId: number): Promise<AuditLog[]> {
    try {
      const result = await prisma.auditLog.findMany({
        where: { entity, entityId },
      });
      return result.map(fromAuditLogPrisma);
    } catch (error) {
      console.error('Error retrieving audit logs by entity:', error);
      throw error;
    }
  }

  /**
   * Retrieves all audit logs related to a specific user.
   * @param userId The ID of the user.
   * @returns A list of audit logs for the given user.
   */
  async getByUser(userId: number): Promise<AuditLog[]> {
    try {
      const result = await prisma.auditLog.findMany({
        where: { userId },
      });
      return result.map(fromAuditLogPrisma);
    } catch (error) {
      console.error('Error retrieving audit logs by user:', error);
      throw error;
    }
  }

  /**
   * Updates an audit log by its ID.
   * @param id The ID of the audit log to update.
   * @param updatedLog The updated audit log data.
   * @returns The updated audit log.
   */
  async update(id: number, updatedLog: AuditLog): Promise<AuditLog> {
    try {
      const { user, ...log } = updatedLog;
      const result = await prisma.auditLog.update({
        where: { id },
        data: log,
      });
      return fromAuditLogPrisma(result);
    } catch (error) {
      console.error('Error updating audit log:', error);
      throw error;
    }
  }

  /**
   * Deletes an audit log by its ID.
   * @param id The ID of the audit log to delete.
   * @returns True if the deletion was successful, false otherwise.
   */
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.auditLog.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error deleting audit log:', error);
      return false;
    }
  }

  /**
   * Retrieves audit logs within a specified date range.
   * @param startDate The start of the date range.
   * @param endDate The end of the date range.
   * @returns A list of audit logs within the date range.
   */
  async getByDateRange(startDate: Date, endDate: Date): Promise<AuditLog[]> {
    try {
      const result = await prisma.auditLog.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      return result.map(fromAuditLogPrisma);
    } catch (error) {
      console.error('Error retrieving audit logs by date range:', error);
      throw error;
    }
  }

  /**
   * Retrieves the most recent audit logs up to a specified limit.
   * @param limit The maximum number of audit logs to retrieve.
   * @returns A list of the most recent audit logs.
   */
  async getRecent(limit: number): Promise<AuditLog[]> {
    try {
      const result = await prisma.auditLog.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
      });
      return result.map(fromAuditLogPrisma);
    } catch (error) {
      console.error('Error retrieving recent audit logs:', error);
      throw error;
    }
  }

  /**
   * Retrieves all audit logs for a specific action.
   * @param action The action type to filter by.
   * @returns A list of audit logs for the given action.
   */
  async getByAction(action: AuditLogAction): Promise<AuditLog[]> {
    try {
      const result = await prisma.auditLog.findMany({
        where: { action },
      });
      return result.map(fromAuditLogPrisma);
    } catch (error) {
      console.error('Error retrieving audit logs by action:', error);
      throw error;
    }
  }
}
