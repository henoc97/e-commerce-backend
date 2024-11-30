import { fromTicketPrisma } from 'src/application/helper/from-prisma/to.ticket.entity';
import { Ticket } from 'src/domain/entities/ticket.entity';
import { TicketStatus } from 'src/domain/enums/ticket-status.enum';
import { ITicketRepository } from 'src/domain/repositories/ticket.repository';
import prisma from 'prisma/prisma.service';

export class TicketRepository implements ITicketRepository {


  /**
   * Creates a new ticket in the database.
   * @param ticket - The ticket object to create.
   * @returns The created ticket.
   */
  async create(ticket: Ticket): Promise<Ticket> {
    try {
      const { id, user, ...data } = ticket;
      const createdTicket = await prisma.ticket.create({
        data: data,
      });
      return fromTicketPrisma(createdTicket);
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw new Error('Could not create ticket');
    }
  }

  /**
   * Retrieves a ticket by its ID.
   * @param id - The unique identifier of the ticket.
   * @returns The ticket if found, otherwise null.
   */
  async getById(id: number): Promise<Ticket | null> {
    try {
      const ticket = await prisma.ticket.findUnique({
        where: { id },
      });
      return fromTicketPrisma(ticket);
    } catch (error) {
      console.error('Error fetching ticket by ID:', error);
      throw new Error('Could not fetch ticket');
    }
  }

  /**
   * Updates an existing ticket with the provided updates.
   * @param id - The ID of the ticket to update.
   * @param updates - The partial updates to apply to the ticket.
   * @returns The updated ticket.
   */
  async update(id: number, updates: Partial<Ticket>): Promise<Ticket> {
    try {
      const { id, user, ...data } = updates;
      const updatedTicket = await prisma.ticket.update({
        where: { id },
        data: data,
      });
      return fromTicketPrisma(updatedTicket);
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw new Error('Could not update ticket');
    }
  }

  /**
   * Removes a ticket from the database by its ID.
   * @param id - The ID of the ticket to remove.
   * @returns True if the ticket was removed, otherwise false.
   */
  async remove(id: number): Promise<boolean> {
    try {
      await prisma.ticket.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Error removing ticket:', error);
      return false;
    }
  }

  /**
   * Retrieves all tickets created by a specific user.
   * @param userId - The ID of the user whose tickets to retrieve.
   * @returns An array of tickets created by the user.
   */
  async getByUser(userId: number): Promise<Ticket[]> {
    try {
      const tickets = await prisma.ticket.findMany({
        where: { userId },
      });
      return tickets?.map(fromTicketPrisma);
    } catch (error) {
      console.error('Error fetching tickets by user:', error);
      throw new Error('Could not fetch tickets');
    }
  }

  /**
   * Retrieves all tickets with a specific status.
   * @param status - The status of the tickets to retrieve.
   * @returns An array of tickets with the specified status.
   */
  async getByStatus(status: TicketStatus): Promise<Ticket[]> {
    try {
      const tickets = await prisma.ticket.findMany({
        where: { status },
      });
      return tickets?.map(fromTicketPrisma);
    } catch (error) {
      console.error('Error fetching tickets by status:', error);
      throw new Error('Could not fetch tickets');
    }
  }

  /**
   * Retrieves all tickets created within a specific date range.
   * @param startDate - The start date of the range.
   * @param endDate - The end date of the range.
   * @returns An array of tickets created within the date range.
   */
  async getByDateRange(startDate: Date, endDate: Date): Promise<Ticket[]> {
    try {
      const tickets = await prisma.ticket.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      return tickets?.map(fromTicketPrisma);
    } catch (error) {
      console.error('Error fetching tickets by date range:', error);
      throw new Error('Could not fetch tickets');
    }
  }

  /**
   * Retrieves the latest created ticket.
   * @returns The latest ticket.
   */
  async getLatest(): Promise<Ticket> {
    try {
      const latestTicket = await prisma.ticket.findFirst({
        orderBy: { createdAt: 'desc' },
      });
      return fromTicketPrisma(latestTicket);
    } catch (error) {
      console.error('Error fetching latest ticket:', error);
      throw new Error('Could not fetch latest ticket');
    }
  }

  /**
   * Counts the number of open tickets for a specific user.
   * @param userId - The ID of the user whose open tickets to count.
   * @returns The number of open tickets.
   */
  async countOpenByUser(userId: number): Promise<number> {
    try {
      const count = await prisma.ticket.count({
        where: {
          userId,
          status: TicketStatus.OPEN,
        },
      });
      return count;
    } catch (error) {
      console.error('Error counting open tickets by user:', error);
      throw new Error('Could not count tickets');
    }
  }

  /**
   * Retrieves all high-priority tickets.
   * @returns An array of high-priority tickets.
   */
  async getHighPriority(): Promise<Ticket[]> {
    try {
      const highPriorityTickets = await prisma.ticket.findMany({
        where: {
          status: 'HIGH', // Assuming a 'priority' field exists
        },
      });
      return highPriorityTickets?.map(fromTicketPrisma);
    } catch (error) {
      console.error('Error fetching high-priority tickets:', error);
      throw new Error('Could not fetch high-priority tickets');
    }
  }

  /**
   * Closes a ticket by changing its status to CLOSED.
   * @param id - The ID of the ticket to close.
   * @returns The updated ticket with CLOSED status.
   */
  async closeTicket(id: number): Promise<Ticket> {
    try {
      const closedTicket = await this.update(id, {
        status: TicketStatus.CLOSED,
      });
      return closedTicket;
    } catch (error) {
      console.error('Error closing ticket:', error);
      throw new Error('Could not close ticket');
    }
  }
}
