import { Ticket } from '../../../domain/entities/ticket.entity';
import { fromUserPrisma } from './to.user.entity';

/**
 * Converts a TicketPrisma to a Ticket entity.
 * @param ticketPrisma - The TicketPrisma to convert.
 * @returns The corresponding Ticket entity.
 */
export function fromTicketPrisma(ticketPrisma: any): Ticket {
  return new Ticket(
    ticketPrisma.id,
    ticketPrisma.userId,
    ticketPrisma.user ? fromUserPrisma(ticketPrisma.user) : undefined,
    ticketPrisma.subject,
    ticketPrisma.description,
    ticketPrisma.status,
    new Date(ticketPrisma.createdAt),
    new Date(ticketPrisma.updatedAt),
  );
}
