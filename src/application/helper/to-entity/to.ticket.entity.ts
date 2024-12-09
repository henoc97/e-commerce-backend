import { Ticket } from '../../../domain/entities/ticket.entity';
import { TicketDTO } from '../../../presentation/dtos/ticket.dto';
import { fromUserDTO } from './to.user.entity';

/**
 * Converts a TicketDTO to a Ticket entity.
 * @param ticketDTO - The TicketDTO to convert.
 * @returns The corresponding Ticket entity.
 */
export function fromTicketDTO(
  ticketDTO: TicketDTO | Partial<TicketDTO>,
): Ticket {
  return new Ticket(
    ticketDTO.id,
    ticketDTO.userId,
    ticketDTO.user ? fromUserDTO(ticketDTO.user) : undefined,
    ticketDTO.subject,
    ticketDTO.description,
    ticketDTO.status,
    new Date(ticketDTO.createdAt),
    new Date(ticketDTO.updatedAt),
  );
}
