import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer"
import { AuditLogAction } from "../../domain/enums/audit-log-action.enum";


/**
 * Input Type for AuditLog.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class AuditLogInput {
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
   * Type of action performed by the user.
   */
  @Field()
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
   * Details of the changes made.
   * Can include before-and-after values or other relevant change information.
   */
  @Field({ nullable: true })
  changes: string;
}
