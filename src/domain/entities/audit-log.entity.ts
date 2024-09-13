import { User } from './user.entity';
import { AuditLogAction } from '../enums/audit-log-action.enum';

/**
 * Represents an audit log entry in the system.
 * Captures details about changes made by users, including the action type, entity affected, and the specific changes.
 */
export class AuditLog {
  /**
   * Unique identifier for the audit log entry.
   * This ID is used to uniquely identify each log entry in the system.
   */
  id: number;

  /**
   * Unique identifier for the user who performed the action.
   * This ID references the `User` entity associated with the log entry.
   */
  userId: number;

  /**
   * The user who performed the action.
   * Provides details about the user responsible for the change.
   */
  user: User;

  /**
   * Type of action performed by the user.
   * This could represent various actions such as create, update, delete, etc.
   */
  action: AuditLogAction;

  /**
   * The entity affected by the action.
   * This represents the type of entity (e.g., 'User', 'Order') that was changed.
   */
  entity: string;

  /**
   * Unique identifier of the entity affected by the action.
   * This ID corresponds to the specific instance of the entity that was changed.
   */
  entityId: number;

  /**
   * Details of the changes made.
   * This can include before-and-after values or other relevant change information.
   */
  changes: any;

  /**
   * The date and time when the action was performed.
   * Automatically set to the current date and time when the log entry is created.
   */
  createdAt: Date;

  /**
   * Constructs a new AuditLog instance.
   * @param id - Unique identifier for the audit log entry.
   * @param userId - Unique identifier of the user who performed the action.
   * @param user - The user who performed the action.
   * @param action - The type of action performed by the user.
   * @param entity - The entity affected by the action.
   * @param entityId - The unique identifier of the entity affected by the action.
   * @param changes - Details of the changes made.
   * @param createdAt - (Optional) The date and time when the action was performed, defaults to the current date and time.
   */
  constructor(
    id: number,
    userId: number,
    user: User,
    action: AuditLogAction,
    entity: string,
    entityId: number,
    changes: any,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.action = action;
    this.entity = entity;
    this.entityId = entityId;
    this.changes = changes;
    this.createdAt = createdAt;
  }
}
