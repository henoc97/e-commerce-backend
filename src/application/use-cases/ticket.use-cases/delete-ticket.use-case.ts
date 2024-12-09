import { Injectable } from '@nestjs/common';
import { TicketService } from '../../../application/services/ticket.service';

/**
 * Use case class for deleting a ticket.
 * This class interacts with the Ticket service to delete a ticket by its ID.
 */
@Injectable()
export class DeleteTicket {
  constructor(private readonly ticketService: TicketService) { }

  /**
   * Execute the delete-ticket use case.
   * @param id - Unique identifier of the ticket to delete.
   * @returns A boolean indicating if the deletion was successful.
   */
  async execute(id: number): Promise<boolean> {
    return this.ticketService.deleteTicket(id);
  }
}
