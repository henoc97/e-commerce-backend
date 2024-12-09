import { Field, ObjectType } from '@nestjs/graphql';
import { AuditLogAction } from '../../domain/enums/audit-log-action.enum';
import { UserOutput } from './user.output';
import { Type } from 'class-transformer';

/**
 * Data Transfer Object for AuditLog.
 * Used for data validation and transformation in API requests and responses.
 */
@ObjectType()
export class AuditLogOutput {
  /**
   * Unique identifier for the audit log entry.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Unique identifier of the user who performed the action.
   */
  @Field()
  userId: number;

  /**
   * User associated with the address.
   */
  @Field(() => UserOutput, { nullable: true })
  @Type(() => UserOutput)
  user?: UserOutput;

  /**
   * Type of action performed by the user.
   */
  @Field(() => AuditLogAction)
  action: AuditLogAction;

  /**
   * The entity affected by the action.
   */
  @Field()
  entity: string;

  /**
   * Unique identifier of the entity affected by the action.
   */
  @Field()
  entityId: number;

  /**
   * Détails des modifications apportées.
   * Peut inclure des valeurs avant et après ou d'autres informations pertinentes sur le changement.
   */
  @Field(() => String, { nullable: true })
  changes?: string;

  /**
   * The date and time when the action was performed.
   * Defaults to the current date and time if not provided.
   */
  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  /**
   * Constructs a new AuditLogOutput instance.
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
    userId?: number,
    action?: AuditLogAction,
    entity?: string,
    entityId?: number,
    changes?: string,
    createdAt: Date = new Date(),
    id?: number,
    user?: UserOutput,
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
