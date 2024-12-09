import { Injectable } from '@nestjs/common';
import { TicketService } from '../../../application/services/ticket.service';
import { TicketDTO } from '../../../presentation/dtos/ticket.dto';
import { toTicketDTO } from '../../../application/helper/to-dto/to.ticket.dto';

/**
 * Use case class for listing tickets by user.
 * This class interacts with the Ticket service to retrieve all tickets associated with a specific user.
 */
@Injectable()
export class ListTicketsByUser {
  constructor(private readonly ticketService: TicketService) { }

  /**
   * Execute the list-tickets-by-user use case.
   * @param userId - Unique identifier of the user whose tickets to retrieve.
   * @returns An array of TicketDTOs for the specified user.
   */
  async execute(userId: number): Promise<TicketDTO[]> {
    const tickets = await this.ticketService.getTicketsByUser(userId);

    return tickets?.map(toTicketDTO);
  }
}
