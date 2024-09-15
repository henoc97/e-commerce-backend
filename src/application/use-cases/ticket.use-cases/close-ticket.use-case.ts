import { Injectable } from '@nestjs/common';
import { TicketService } from 'src/application/services/ticket.service';
import { TicketDTO } from 'src/presentation/dtos/ticket.dto';
import { toTicketDTO } from 'src/application/helper/to-dto/to.ticket.dto';

/**
 * Use case class for closing a ticket.
 * This class encapsulates the business logic for closing tickets.
 * It interacts with the Ticket service to update the ticket status.
 */
@Injectable()
export class CloseTicket {
  constructor(private readonly ticketService: TicketService) {}

  /**
   * Execute the close-ticket use case.
   * @param id - Unique identifier of the ticket to close.
   * @returns The updated TicketDTO with status set to 'Closed'.
   */
  async execute(id: number): Promise<TicketDTO | null> {
    const ticket = await this.ticketService.closeTicket(id);

    if (!ticket) return null;

    return toTicketDTO(ticket);
  }
}
