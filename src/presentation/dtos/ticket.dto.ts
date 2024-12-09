import {
  IsInt,
  IsString,
  IsEnum,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TicketStatus } from '../../domain/enums/ticket-status.enum';
import { UserDTO } from './user.dto';

/**
 * Data Transfer Object for Ticket.
 * Used for validating and transforming ticket data in API requests and responses.
 */
export class TicketDTO {
  /**
   * Unique identifier for the ticket.
   */
  @IsInt()
  id: number;

  /**
   * Unique identifier for the user who created the ticket.
   */
  @IsInt()
  userId: number;

  /**
   * The user associated with this ticket.
   * Provides details about the user who created the ticket.
   */
  @ValidateNested()
  @Type(() => UserDTO)
  user: UserDTO;

  /**
   * The subject of the ticket.
   */
  @IsString()
  subject: string;

  /**
   * Detailed description of the issue or request.
   */
  @IsString()
  description: string;

  /**
   * The current status of the ticket (e.g., OPEN, IN_PROGRESS, CLOSED).
   */
  @IsEnum(TicketStatus)
  status: TicketStatus;

  /**
   * The date and time when the ticket was created.
   */
  @IsDateString()
  createdAt: Date;

  /**
   * The date and time when the ticket was last updated.
   */
  @IsDateString()
  updatedAt: Date;

  /**
   * Creates a new TicketDTO instance.
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
    user: UserDTO,
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
