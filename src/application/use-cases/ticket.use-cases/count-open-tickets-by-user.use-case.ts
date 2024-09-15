import { Injectable } from '@nestjs/common';
import { TicketService } from 'src/application/services/ticket.service';

/**
 * Use case class for counting open tickets by user.
 * This class interacts with the Ticket service to count tickets with 'Open' status for a specific user.
 */
@Injectable()
export class CountOpenTicketsByUser {
  constructor(private readonly ticketService: TicketService) {}

  /**
   * Execute the count-open-tickets-by-user use case.
   * @param userId - Unique identifier of the user.
   * @returns The count of open tickets for the specified user.
   */
  async execute(userId: number): Promise<number> {
    return this.ticketService.countOpenTicketsByUser(userId);
  }
}
