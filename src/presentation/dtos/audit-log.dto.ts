import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsObject,
  IsEnum,
  IsOptional,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AuditLogAction } from '../../domain/enums/audit-log-action.enum';
import { UserDTO } from './user.dto';

/**
 * Data Transfer Object for AuditLog.
 * Used for data validation and transformation in API requests and responses.
 */
export class AuditLogDTO {
  /**
   * Unique identifier for the audit log entry.
   */
  @IsInt()
  @IsOptional()
  id?: number;

  /**
   * Unique identifier of the user who performed the action.
   */
  @IsInt()
  @IsNotEmpty()
  userId: number;

  /**
   * User associated with the address.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => UserDTO)
  user?: UserDTO;

  /**
   * Type of action performed by the user.
   */
  @IsEnum(AuditLogAction)
  @IsNotEmpty()
  action: AuditLogAction;

  /**
   * The entity affected by the action.
   */
  @IsString()
  @IsNotEmpty()
  entity: string;

  /**
   * Unique identifier of the entity affected by the action.
   */
  @IsInt()
  @IsNotEmpty()
  entityId: number;

  /**
   * Details of the changes made.
   * Can include before-and-after values or other relevant change information.
   */
  @IsObject()
  @IsNotEmpty()
  changes: any;

  /**
   * The date and time when the action was performed.
   * Defaults to the current date and time if not provided.
   */
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  createdAt?: Date;

  /**
   * Constructs a new AuditLogDTO instance.
   * @param userId - Unique identifier of the user who performed the action.
   * @param action - The type of action performed by the user.
   * @param entity - The entity affected by the action.
   * @param entityId - The unique identifier of the entity affected by the action.
   * @param changes - Details of the changes made.
   * @param createdAt - (Optional) The date and time when the action was performed, defaults to the current date and time.
   * @param id - (Optional) Unique identifier for the audit log entry.
   * @param user - (Optional) The user who performed the action
   */
  constructor(
    userId: number,
    action: AuditLogAction,
    entity: string,
    entityId: number,
    changes: any,
    createdAt: Date = new Date(),
    id?: number,
    user?: UserDTO,
  ) {
    this.id = id;
    this.userId = userId;
    this.action = action;
    this.entity = entity;
    this.entityId = entityId;
    this.changes = changes;
    this.user = user;
    this.createdAt = createdAt;
  }
}
