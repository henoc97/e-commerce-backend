import { Ticket } from '../../domain/entities/ticket.entity';
import { TicketStatus } from '../../domain/enums/ticket-status.enum';
import { ITicketRepository } from '../../domain/repositories/ticket.repository';
import { TicketDTO } from '../../presentation/dtos/ticket.dto';
import { fromTicketDTO } from '../helper/to-entity/to.ticket.entity';
import { Inject } from '@nestjs/common';

/**
 * Service class for handling ticket-related operations.
 * Implements business logic for creating, retrieving, updating, and deleting tickets.
 */
export class TicketService {
  /**
   * Constructs a new TicketService instance.
   * @param ticketRepository - The repository instance for interacting with the ticket data.
   */
  constructor(
    @Inject('ITicketRepository')
    private readonly ticketRepository: ITicketRepository,
  ) { }

  /**
   * Creates a new support ticket.
   * @param ticketDTO - The data transfer object containing the details of the ticket to create.
   * @returns The created Ticket entity.
   */
  async createTicket(ticketDTO: TicketDTO): Promise<Ticket> {
    // Map DTO to entity
    const ticket = fromTicketDTO(ticketDTO);
    // Call repository method to create ticket
    return await this.ticketRepository.create(ticket);
  }

  /**
   * Retrieves a ticket by its unique ID.
   * @param id - Unique identifier of the ticket to retrieve.
   * @returns The Ticket entity if found, otherwise null.
   */
  async getTicketById(id: number): Promise<Ticket | null> {
    return await this.ticketRepository.getById(id);
  }

  /**
   * Updates the details of an existing ticket.
   * @param id - Unique identifier of the ticket to update.
   * @param updates - Partial fields to update.
   * @returns The updated Ticket entity.
   */
  async updateTicket(id: number, updates: Partial<TicketDTO>): Promise<Ticket> {
    // Convert DTO updates to entity updates
    const updateFields = fromTicketDTO(updates);

    return await this.ticketRepository.update(id, updateFields);
  }

  /**
   * Deletes a ticket by its unique ID.
   * @param id - Unique identifier of the ticket to delete.
   * @returns A boolean indicating if the deletion was successful.
   */
  async deleteTicket(id: number): Promise<boolean> {
    return await this.ticketRepository.remove(id);
  }

  /**
   * Retrieves all tickets associated with a specific user.
   * @param userId - Unique identifier of the user whose tickets to retrieve.
   * @returns An array of Ticket entities for the specified user.
   */
  async getTicketsByUser(userId: number): Promise<Ticket[]> {
    return await this.ticketRepository.getByUser(userId);
  }

  /**
   * Retrieves all tickets with a specific status.
   * @param status - The status of the tickets to retrieve.
   * @returns An array of Ticket entities with the specified status.
   */
  async getTicketsByStatus(status: TicketStatus): Promise<Ticket[]> {
    return await this.ticketRepository.getByStatus(status);
  }

  /**
   * Retrieves tickets created within a specific date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns An array of Ticket entities created within the specified date range.
   */
  async getTicketsByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Ticket[]> {
    return await this.ticketRepository.getByDateRange(startDate, endDate);
  }

  /**
   * Retrieves the most recently created ticket.
   * @returns The latest Ticket entity.
   */
  async getLatestTicket(): Promise<Ticket> {
    return await this.ticketRepository.getLatest();
  }

  /**
   * Counts the number of open tickets for a specific user.
   * @param userId - Unique identifier of the user.
   * @returns The number of open tickets.
   */
  async countOpenTicketsByUser(userId: number): Promise<number> {
    return await this.ticketRepository.countOpenByUser(userId);
  }

  /**
   * Retrieves all high-priority tickets.
   * @returns An array of high-priority Ticket entities.
   */
  async getHighPriorityTickets(): Promise<Ticket[]> {
    return await this.ticketRepository.getHighPriority();
  }

  /**
   * Closes a ticket by setting its status to 'Closed'.
   * @param id - Unique identifier of the ticket to close.
   * @returns The updated Ticket entity.
   */
  async closeTicket(id: number): Promise<Ticket> {
    // Update ticket status to 'Closed'
    return await this.ticketRepository.closeTicket(id);
  }
}
