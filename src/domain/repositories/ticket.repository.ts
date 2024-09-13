import { Ticket } from "../entities/ticket.entity";
import { TicketStatus } from "../enums/ticket-status.enum";

/**
 * Interface for handling support ticket operations, including CRUD and business logic.
 */
export interface ITicketRepository {

  /**
   * Creates a new support ticket.
   * @param ticket - The Ticket entity to be created.
   * @returns The created Ticket entity.
   */
  create(ticket: Ticket): Promise<Ticket>;

  /**
   * Fetches a ticket by its unique ID.
   * @param id - Unique identifier of the ticket.
   * @returns The Ticket if found, otherwise null.
   */
  getById(id: number): Promise<Ticket | null>;

  /**
   * Updates a ticket's details.
   * @param id - Unique identifier of the ticket.
   * @param updates - Partial fields to be updated.
   * @returns The updated Ticket entity.
   */
  update(id: number, updates: Partial<Ticket>): Promise<Ticket>;

  /**
   * Removes a ticket by its unique ID.
   * @param id - Unique identifier of the ticket.
   * @returns A boolean indicating if the deletion was successful.
   */
  remove(id: number): Promise<boolean>;

  /**
   * Retrieves all tickets for a specific user.
   * @param userId - Unique identifier of the user.
   * @returns An array of tickets for the specified user.
   */
  getByUser(userId: number): Promise<Ticket[]>;

  /**
   * Retrieves all tickets with a specific status.
   * @param status - The status of the tickets to retrieve.
   * @returns An array of tickets with the specified status.
   */
  getByStatus(status: TicketStatus): Promise<Ticket[]>;

  /**
   * Retrieves tickets created within a specific date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns An array of tickets created within the specified date range.
   */
  getByDateRange(startDate: Date, endDate: Date): Promise<Ticket[]>;

  /**
   * Retrieves the most recently created ticket.
   * @returns The latest Ticket entity.
   */
  getLatest(): Promise<Ticket>;

  /**
   * Counts the number of open tickets for a specific user.
   * @param userId - Unique identifier of the user.
   * @returns The number of open tickets.
   */
  countOpenByUser(userId: number): Promise<number>;

  /**
   * Retrieves all high-priority tickets.
   * @returns An array of high-priority tickets.
   */
  getHighPriority(): Promise<Ticket[]>;

  /**
   * Closes a ticket by setting its status to 'Closed'.
   * @param id - Unique identifier of the ticket to close.
   * @returns The updated Ticket entity.
   */
  closeTicket(id: number): Promise<Ticket>;
}
