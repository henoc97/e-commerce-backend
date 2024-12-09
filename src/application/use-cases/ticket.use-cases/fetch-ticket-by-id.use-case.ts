import { Injectable } from '@nestjs/common';
import { TicketService } from '../../../application/services/ticket.service';
import { TicketDTO } from '../../../presentation/dtos/ticket.dto';
import { toTicketDTO } from '../../../application/helper/to-dto/to.ticket.dto';

/**
 * Use case class for fetching a ticket by its ID.
 * This class interacts with the Ticket service to retrieve a ticket by its unique ID.
 */
@Injectable()
export class FetchTicketById {
  constructor(private readonly ticketService: TicketService) { }

  /**
   * Execute the fetch-ticket-by-id use case.
   * @param id - Unique identifier of the ticket to retrieve.
   * @returns The TicketDTO if found, otherwise null.
   */
  async execute(id: number): Promise<TicketDTO | null> {
    const ticket = await this.ticketService.getTicketById(id);

    if (!ticket) return null;

    return toTicketDTO(ticket);
  }
}
