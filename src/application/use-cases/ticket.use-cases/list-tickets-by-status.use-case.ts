import { Injectable } from '@nestjs/common';
import { TicketService } from 'src/application/services/ticket.service';
import { TicketDTO } from 'src/presentation/dtos/ticket.dto';
import { TicketStatus } from 'src/domain/enums/ticket-status.enum';
import { toTicketDTO } from 'src/application/helper/to-dto/to.ticket.dto';

/**
 * Use case class for listing tickets by status.
 * This class interacts with the Ticket service to retrieve tickets with a specific status.
 */
@Injectable()
export class ListTicketsByStatus {
  constructor(private readonly ticketService: TicketService) {}

  /**
   * Execute the list-tickets-by-status use case.
   * @param status - The status of the tickets to retrieve.
   * @returns An array of TicketDTOs with the specified status.
   */
  async execute(status: TicketStatus): Promise<TicketDTO[]> {
    const tickets = await this.ticketService.getTicketsByStatus(status);

    return tickets.map(toTicketDTO);
  }
}
