import { Injectable } from '@nestjs/common';
import { TicketService } from '../../../application/services/ticket.service';
import { TicketDTO } from '../../../presentation/dtos/ticket.dto';
import { toTicketDTO } from '../../../application/helper/to-dto/to.ticket.dto';

/**
 * Use case class for listing high-priority tickets.
 * This class interacts with the Ticket service to retrieve all high-priority tickets.
 */
@Injectable()
export class ListHighPriorityTickets {
  constructor(private readonly ticketService: TicketService) { }

  /**
   * Execute the list-high-priority-tickets use case.
   * @returns An array of high-priority TicketDTOs.
   */
  async execute(): Promise<TicketDTO[]> {
    const tickets = await this.ticketService.getHighPriorityTickets();

    return tickets?.map(toTicketDTO);
  }
}
