import { Injectable } from '@nestjs/common';
import { TicketService } from 'src/application/services/ticket.service';
import { TicketDTO } from 'src/presentation/dtos/ticket.dto';
import { toTicketDTO } from 'src/application/helper/to-dto/to.ticket.dto';

/**
 * Use case class for fetching the latest ticket.
 * This class interacts with the Ticket service to retrieve the most recently created ticket.
 */
@Injectable()
export class FetchLatestTicket {
  constructor(private readonly ticketService: TicketService) {}

  /**
   * Execute the fetch-latest-ticket use case.
   * @returns The latest TicketDTO.
   */
  async execute(): Promise<TicketDTO | null> {
    const ticket = await this.ticketService.getLatestTicket();

    if (!ticket) return null;

    return toTicketDTO(ticket);
  }
}
