import { TicketStatus } from '../enums/ticket-status.enum';
import { User } from './user.entity';

/**
 * Represents a support ticket created by a user.
 * Stores details about the ticket such as subject, description, status, and timestamps.
 */
export class Ticket {
  /**
   * Unique identifier for the ticket.
   */
  id: number;

  /**
   * Unique identifier for the user who created the ticket.
   */
  userId: number;

  /**
   * The user associated with the ticket.
   */
  user: User;

  /**
   * The subject of the ticket.
   */
  subject: string;

  /**
   * Detailed description of the issue or request.
   */
  description: string;

  /**
   * The current status of the ticket (e.g., OPEN, IN_PROGRESS, CLOSED).
   */
  status: TicketStatus;

  /**
   * The date and time when the ticket was created.
   * Automatically set to the current date and time when the ticket is created.
   */
  createdAt: Date;

  /**
   * The date and time when the ticket was last updated.
   * Automatically set to the current date and time when the ticket is created.
   */
  updatedAt: Date;

  /**
   * Creates a new Ticket instance.
   * @param id - Unique identifier for the ticket.
   * @param userId - Unique identifier for the user who created the ticket.
   * @param user - The user associated with the ticket.
   * @param subject - The subject of the ticket.
   * @param description - The description of the issue or request.
   * @param status - The current status of the ticket.
   * @param createdAt - (Optional) Date and time of ticket creation.
   * @param updatedAt - (Optional) Date and time of the last update.
   */
  constructor(
    id: number,
    userId: number,
    user: User,
    subject: string,
    description: string,
    status: TicketStatus,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
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
