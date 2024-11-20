import { Field, InputType } from "@nestjs/graphql";
import { TicketStatus } from "src/domain/enums/ticket-status.enum";


/**
 * Input Type for Ticket.
 * Used as input data for GraphQL mutations.
 */
@InputType()
export class TicketInput {
  /**
   * Unique identifier for the ticket.
   */
  @Field({ nullable: true })
  id?: number;

  /**
   * Unique identifier for the user who created the ticket.
   */
  @Field()
  userId: number;

  /**
   * The subject of the ticket.
   */
  @Field()
  subject: string;

  /**
   * Detailed description of the issue or request.
   */
  @Field()
  description: string;

  /**
   * The current status of the ticket (e.g., OPEN, IN_PROGRESS, CLOSED).
   */
  @Field()
  status: TicketStatus;
}
