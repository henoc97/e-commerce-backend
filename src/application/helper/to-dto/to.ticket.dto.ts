import { TicketDTO } from 'src/presentation/dtos/ticket.dto';
import { toUserDTO } from './to.user.dto';
import { Ticket } from 'src/domain/entities/ticket.entity';

/**
 * Converts a Ticket entity to TicketDTO.
 * @param ticket - The Ticket entity to convert.
 * @returns The corresponding TicketDTO.
 */
export function toTicketDTO(ticket: any): TicketDTO {
  return new TicketDTO(
    ticket.id,
    ticket.userId,
    ticket.user ? toUserDTO(ticket.user) : undefined,
    ticket.subject,
    ticket.description,
    ticket.status,
    ticket.createdAt,
    ticket.updatedAt,
  );
}
