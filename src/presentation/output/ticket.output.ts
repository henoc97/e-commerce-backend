import { Field, ObjectType } from "@nestjs/graphql";
import { UserOutput } from "./user.output";
import { TicketStatus } from "src/domain/enums/ticket-status.enum";

/**
 * Data Transfer Object for Ticket.
 * Used for validating and transforming ticket data in API requests and responses.
 */
@ObjectType()
export class TicketOutput {
  /**
   * Unique identifier for the ticket.
   */
  @Field()
  id: number;

  /**
   * Unique identifier for the user who created the ticket.
   */
  @Field()
  userId: number;

  /**
   * The user associated with this ticket.
   * Provides details about the user who created the ticket.
   */
  @Field(() => UserOutput, { nullable: true })
  user: UserOutput;

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
  @Field(() => TicketStatus)
  status: TicketStatus;

  /**
   * The date and time when the ticket was created.
   */
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  /**
   * The date and time when the ticket was last updated.
   */
  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  /**
   * Creates a new TicketOutput instance.
   * @param id - Unique identifier for the ticket.
   * @param userId - Unique identifier for the user who created the ticket.
   * @param user - The user associated with the ticket.
   * @param subject - The subject of the ticket.
   * @param description - The description of the issue or request.
   * @param status - The current status of the ticket.
   * @param createdAt - (Optional) Date and time of ticket creation, defaults to the current date and time.
   * @param updatedAt - (Optional) Date and time of the last update, defaults to the current date and time.
   */
  constructor(
    id: number,
    userId: number,
    user: UserOutput,
    subject: string,
    description: string,
    status: TicketStatus,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.id = id;
    this.userId = userId;
    this.user = user;
    this.subject = subject;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
