import { Injectable } from '@nestjs/common';
import { TicketService } from '../../../application/services/ticket.service';
import { TicketDTO } from '../../../presentation/dtos/ticket.dto';
import { toTicketDTO } from '../../../application/helper/to-dto/to.ticket.dto';

/**
 * Use case class for creating a ticket.
 * This class encapsulates the business logic for creating tickets.
 * It interacts with the Ticket service to create a new ticket.
 */
@Injectable()
export class CreateTicket {
  constructor(private readonly ticketService: TicketService) { }

  /**
   * Execute the create-ticket use case.
   * @param ticketDTO - The TicketDTO containing the ticket details.
   * @returns The created TicketDTO.
   */
  async execute(ticketDTO: TicketDTO): Promise<TicketDTO | null> {
    const ticket = await this.ticketService.createTicket(ticketDTO);

    if (!ticket) return null;

    return toTicketDTO(ticket);
  }
}
