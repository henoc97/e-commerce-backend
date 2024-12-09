import { Injectable } from '@nestjs/common';
import { TicketService } from '../../../application/services/ticket.service';
import { TicketDTO } from '../../../presentation/dtos/ticket.dto';
import { toTicketDTO } from '../../../application/helper/to-dto/to.ticket.dto';

/**
 * Use case class for updating a ticket.
 * This class interacts with the Ticket service to update the details of an existing ticket.
 */
@Injectable()
export class UpdateTicket {
  constructor(private readonly ticketService: TicketService) { }

  /**
   * Execute the update-ticket use case.
   * @param id - Unique identifier of the ticket to update.
   * @param updates - Partial fields to update.
   * @returns The updated TicketDTO.
   */
  async execute(
    id: number,
    updates: Partial<TicketDTO>,
  ): Promise<TicketDTO | null> {
    const ticket = await this.ticketService.updateTicket(id, updates);

    if (!ticket) return null;

    return toTicketDTO(ticket);
  }
}
